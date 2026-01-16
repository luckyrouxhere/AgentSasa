#!/usr/bin/env node

import TaskAutomationAgent from './agent.js';
import chalk from 'chalk';
import inquirer from 'inquirer';
import dotenv from 'dotenv';
import { Command } from 'commander';
import fs from 'fs';

dotenv.config();

const program = new Command();

program
  .name('sasa')
  .description('SASA - Smart Autonomous System Agent. AI-powered task automation using Claude')
  .version('1.0.0');

program
  .command('run')
  .description('Run a task automation')
  .argument('<task>', 'Task description')
  .option('-k, --api-key <key>', 'Anthropic API key (or set ANTHROPIC_API_KEY env var)')
  .action(async (task, options) => {
    const apiKey = options.apiKey || process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      console.error(chalk.red('Error: ANTHROPIC_API_KEY not found'));
      console.log(chalk.yellow('Set it in .env file or pass with --api-key flag'));
      process.exit(1);
    }

    try {
      const agent = new TaskAutomationAgent(apiKey);
      await agent.processTask(task);
    } catch (error) {
      console.error(chalk.red(`\nError: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('interactive')
  .alias('i')
  .description('Start interactive mode')
  .option('-k, --api-key <key>', 'Anthropic API key')
  .action(async (options) => {
    const apiKey = options.apiKey || process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      console.error(chalk.red('Error: ANTHROPIC_API_KEY not found'));
      console.log(chalk.yellow('Set it in .env file or pass with --api-key flag'));
      process.exit(1);
    }

    console.log(chalk.blue.bold('\n🤖 Task Automation Agent - Interactive Mode\n'));
    console.log(chalk.gray('Type your task or "exit" to quit\n'));

    const agent = new TaskAutomationAgent(apiKey);

    while (true) {
      const { task } = await inquirer.prompt([
        {
          type: 'input',
          name: 'task',
          message: chalk.cyan('Task:'),
          validate: (input) => input.length > 0 || 'Please enter a task'
        }
      ]);

      if (task.toLowerCase() === 'exit' || task.toLowerCase() === 'quit') {
        console.log(chalk.yellow('\nGoodbye! 👋'));
        break;
      }

      try {
        await agent.processTask(task);
      } catch (error) {
        console.error(chalk.red(`\nError: ${error.message}`));
      }

      console.log('\n' + chalk.gray('─'.repeat(60)) + '\n');
    }
  });

program
  .command('examples')
  .description('Show example tasks')
  .action(() => {
    console.log(chalk.blue.bold('\n📋 Example Tasks:\n'));
    
    const examples = [
      {
        task: 'Create a new React component called Button in src/components',
        description: 'Creates a new file with boilerplate React component code'
      },
      {
        task: 'Find all TODO comments in JavaScript files and create a summary',
        description: 'Searches files and aggregates TODO items'
      },
      {
        task: 'Download the latest release info from GitHub API for nodejs/node',
        description: 'Makes HTTP request and formats the data'
      },
      {
        task: 'Create a project structure for a Node.js API with folders for routes, controllers, and models',
        description: 'Creates multiple directories and files'
      },
      {
        task: 'Analyze package.json and list all outdated dependencies',
        description: 'Reads file, executes npm commands, and summarizes'
      }
    ];

    examples.forEach((example, idx) => {
      console.log(chalk.green(`${idx + 1}. ${example.task}`));
      console.log(chalk.gray(`   → ${example.description}\n`));
    });

    console.log(chalk.yellow('Run any example with:'));
    console.log(chalk.cyan('  sasa run "your task here"\n'));
  });

// Parse arguments
program.parse();

// If no command provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
