# Quick Start Guide

Get up and running with SASA in 5 minutes! ⚡

## 1. Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sasa.git
cd sasa

# Install dependencies
npm install
```

## 2. Setup API Key

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Anthropic API key
# Get your key from: https://console.anthropic.com/
```

Your `.env` file should look like:
```env
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

## 3. Run Your First Task

```bash
# Simple example
node index.js run "Create a file called test.txt with Hello World"

# Or use the shorthand
npm start run "Create a file called test.txt with Hello World"
```

## 4. Try Interactive Mode

```bash
npm run dev
```

Then type tasks like:
- `Create a React component`
- `List all files in current directory`
- `Fetch latest Node.js release info`

## 5. Explore Examples

```bash
# View example tasks
npm run examples

# Run the example file
node examples.js
```

## Common Tasks

### Create Files
```bash
sasa run "Create a package.json for a React project"
```

### Process Data
```bash
sasa run "Read data.json and create a summary report"
```

### Generate Code
```bash
sasa run "Create a simple Express server in server.js"
```

### API Calls
```bash
sasa run "Get weather data from wttr.in and save to weather.txt"
```

## Tips

- Be specific in task descriptions
- Break complex tasks into smaller ones
- Use natural language - the AI understands context
- Check the output for any errors or issues

## Next Steps

- Read the full [README.md](README.md)
- Check out [examples.js](examples.js) for more complex use cases
- Learn about [adding custom tools](CONTRIBUTING.md#adding-new-tools)
- Join discussions on GitHub

## Troubleshooting

### "ANTHROPIC_API_KEY not found"
- Make sure you created the `.env` file
- Check that your API key is valid
- Ensure the key starts with `sk-ant-`

### "Module not found"
- Run `npm install` again
- Check Node.js version (needs >= 18.0.0)

### Task not completing
- Make sure the task is clear and specific
- Check if you're asking for something that requires external permissions
- Try breaking it into smaller subtasks

## Need Help?

- Open an [issue](https://github.com/yourusername/sasa/issues)
- Check [discussions](https://github.com/yourusername/sasa/discussions)
- Read the [documentation](README.md)

Happy automating! 🚀
