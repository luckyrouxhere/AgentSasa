# 🤖 SASA (Smart Autonomous System Agent)

AI-powered task automation agent using Claude API. SASA automates complex tasks by intelligently breaking them down and executing them step by step.

## ✨ Features

- **Intelligent Task Breakdown**: Automatically decomposes complex tasks into manageable steps
- **Built-in Tools**: File operations, shell commands, HTTP requests, and more
- **CLI Interface**: Easy-to-use command-line interface
- **Interactive Mode**: Conversational task execution
- **Extensible**: Easy to add custom tools
- **Progress Tracking**: Visual feedback with spinners and colored output

## 📦 Installation

### Prerequisites

- Node.js >= 18.0.0
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sasa.git
cd sasa
```

2. Install dependencies:
```bash
npm install
```

3. Set up your API key:
```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

4. (Optional) Install globally:
```bash
npm link
```

## 🚀 Usage

### Basic Command

```bash
node index.js run "your task description"
```

Or if installed globally:
```bash
sasa run "your task description"
```

### Interactive Mode

```bash
node index.js interactive
# or
sasa i
```

### View Examples

```bash
node index.js examples
```

## 📋 Example Tasks

### 1. File Operations
```bash
sasa run "Create a README.md file with project documentation"
```

### 2. Code Generation
```bash
sasa run "Create a React component called UserCard in src/components with props for name and email"
```

### 3. Data Processing
```bash
sasa run "Read data.json, filter items where status is active, and save to active-items.json"
```

### 4. API Interactions
```bash
sasa run "Fetch the latest release from GitHub API for nodejs/node and create a summary"
```

### 5. Project Setup
```bash
sasa run "Create a Node.js project structure with folders for src, tests, and config"
```

### 6. Code Analysis
```bash
sasa run "Find all console.log statements in JavaScript files and create a report"
```

## 🛠️ Available Tools

The agent has access to these built-in tools:

- **read_file**: Read contents of a file
- **write_file**: Write content to a file
- **list_directory**: List directory contents
- **execute_shell**: Execute shell commands
- **http_request**: Make HTTP requests (GET, POST, etc.)
- **task_complete**: Mark task as finished

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

### Passing API Key via Flag

```bash
sasa run "your task" --api-key sk-ant-...
```

## 🎯 How It Works

1. **Task Input**: You provide a task description
2. **Planning**: Claude analyzes the task and creates a plan
3. **Execution**: The agent executes tools step by step
4. **Iteration**: Results are fed back to Claude for next steps
5. **Completion**: Task is marked complete with a summary

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding Custom Tools

You can extend the agent by adding custom tools in `agent.js`:

```javascript
{
  name: 'your_tool_name',
  description: 'What your tool does',
  input_schema: {
    type: 'object',
    properties: {
      param: {
        type: 'string',
        description: 'Parameter description'
      }
    },
    required: ['param']
  }
}
```

Then implement the tool in the `executeTool` method.

## ⚠️ Safety Notes

- The agent can execute shell commands - use with caution
- Review file write operations in sensitive directories
- Be mindful of API usage and costs
- Don't commit your `.env` file with API keys

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Built with [Anthropic Claude API](https://www.anthropic.com/)
- Uses [Commander.js](https://github.com/tj/commander.js/) for CLI
- Styled with [Chalk](https://github.com/chalk/chalk)

## 📞 Support

- Issues: [GitHub Issues](https://github.com/yourusername/sasa/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/sasa/discussions)

## 🗺️ Roadmap

- [ ] Add more built-in tools
- [ ] Support for custom tool plugins
- [ ] Task templates and presets
- [ ] Multi-step task history
- [ ] Web UI interface
- [ ] Docker support

---

Made with ❤️ using Claude API
