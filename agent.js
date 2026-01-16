#!/usr/bin/env node

import Anthropic from '@anthropic-ai/sdk';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import axios from 'axios';

const execAsync = promisify(exec);

class TaskAutomationAgent {
  constructor(apiKey) {
    this.client = new Anthropic({ apiKey });
    this.conversationHistory = [];
    this.tools = this.initializeTools();
    this.maxIterations = 10;
  }

  initializeTools() {
    return [
      {
        name: 'read_file',
        description: 'Read contents of a file from the filesystem',
        input_schema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Path to the file to read'
            }
          },
          required: ['path']
        }
      },
      {
        name: 'write_file',
        description: 'Write content to a file. Creates the file if it doesn\'t exist',
        input_schema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Path to the file to write'
            },
            content: {
              type: 'string',
              description: 'Content to write to the file'
            }
          },
          required: ['path', 'content']
        }
      },
      {
        name: 'list_directory',
        description: 'List contents of a directory',
        input_schema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Path to the directory to list'
            }
          },
          required: ['path']
        }
      },
      {
        name: 'execute_shell',
        description: 'Execute a shell command. Use with caution.',
        input_schema: {
          type: 'object',
          properties: {
            command: {
              type: 'string',
              description: 'Shell command to execute'
            }
          },
          required: ['command']
        }
      },
      {
        name: 'http_request',
        description: 'Make an HTTP request to a URL',
        input_schema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL to request'
            },
            method: {
              type: 'string',
              description: 'HTTP method (GET, POST, etc.)',
              enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
            },
            headers: {
              type: 'object',
              description: 'HTTP headers'
            },
            data: {
              type: 'object',
              description: 'Request body data'
            }
          },
          required: ['url', 'method']
        }
      },
      {
        name: 'task_complete',
        description: 'Mark the task as complete with a final result',
        input_schema: {
          type: 'object',
          properties: {
            result: {
              type: 'string',
              description: 'Final result or summary of the completed task'
            }
          },
          required: ['result']
        }
      }
    ];
  }

  async executeTool(toolName, toolInput) {
    const spinner = ora(`Executing: ${chalk.cyan(toolName)}`).start();
    
    try {
      let result;

      switch (toolName) {
        case 'read_file':
          result = await fs.readFile(toolInput.path, 'utf-8');
          spinner.succeed(`Read file: ${chalk.green(toolInput.path)}`);
          break;

        case 'write_file':
          await fs.writeFile(toolInput.path, toolInput.content, 'utf-8');
          result = `Successfully wrote to ${toolInput.path}`;
          spinner.succeed(`Wrote file: ${chalk.green(toolInput.path)}`);
          break;

        case 'list_directory':
          const files = await fs.readdir(toolInput.path);
          result = files.join('\n');
          spinner.succeed(`Listed directory: ${chalk.green(toolInput.path)}`);
          break;

        case 'execute_shell':
          const { stdout, stderr } = await execAsync(toolInput.command);
          result = stdout || stderr;
          spinner.succeed(`Executed: ${chalk.green(toolInput.command)}`);
          break;

        case 'http_request':
          const response = await axios({
            url: toolInput.url,
            method: toolInput.method,
            headers: toolInput.headers,
            data: toolInput.data
          });
          result = JSON.stringify(response.data, null, 2);
          spinner.succeed(`HTTP ${toolInput.method}: ${chalk.green(toolInput.url)}`);
          break;

        case 'task_complete':
          result = toolInput.result;
          spinner.succeed(chalk.green.bold('Task completed!'));
          break;

        default:
          throw new Error(`Unknown tool: ${toolName}`);
      }

      return result;
    } catch (error) {
      spinner.fail(`Error executing ${toolName}: ${error.message}`);
      return `Error: ${error.message}`;
    }
  }

  async processTask(task) {
    console.log(chalk.blue.bold('\n🤖 Task Automation Agent\n'));
    console.log(chalk.yellow(`Task: ${task}\n`));

    this.conversationHistory = [
      {
        role: 'user',
        content: `You are a task automation agent. Break down and execute the following task step by step using the available tools.

Task: ${task}

Important guidelines:
1. Think through the task and break it into logical steps
2. Use the available tools to accomplish each step
3. When you've completed the task, use the task_complete tool with a summary
4. Be methodical and explain your reasoning`
      }
    ];

    let iteration = 0;
    let isComplete = false;

    while (iteration < this.maxIterations && !isComplete) {
      iteration++;
      console.log(chalk.gray(`\n--- Iteration ${iteration} ---\n`));

      const spinner = ora('Thinking...').start();

      try {
        const response = await this.client.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          tools: this.tools,
          messages: this.conversationHistory
        });

        spinner.stop();

        // Process response
        for (const content of response.content) {
          if (content.type === 'text') {
            console.log(chalk.white(content.text));
          } else if (content.type === 'tool_use') {
            console.log(chalk.magenta(`\n→ Using tool: ${content.name}`));
            console.log(chalk.gray(JSON.stringify(content.input, null, 2)));

            const toolResult = await this.executeTool(content.name, content.input);

            if (content.name === 'task_complete') {
              isComplete = true;
              console.log(chalk.green.bold(`\n✓ ${toolResult}`));
              return toolResult;
            }

            // Add tool result to conversation
            this.conversationHistory.push({
              role: 'assistant',
              content: response.content
            });

            this.conversationHistory.push({
              role: 'user',
              content: [
                {
                  type: 'tool_result',
                  tool_use_id: content.id,
                  content: toolResult
                }
              ]
            });
          }
        }

        // If response doesn't require tools, add it to history
        if (response.stop_reason === 'end_turn') {
          this.conversationHistory.push({
            role: 'assistant',
            content: response.content
          });
        }

      } catch (error) {
        spinner.fail(`Error: ${error.message}`);
        throw error;
      }
    }

    if (!isComplete) {
      console.log(chalk.red('\n⚠ Maximum iterations reached without completion'));
    }
  }
}

export default TaskAutomationAgent;
