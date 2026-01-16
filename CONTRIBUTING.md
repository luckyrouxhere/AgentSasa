# Contributing to SASA

Thank you for considering contributing to SASA! 🎉

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/sasa/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (OS, Node version, etc.)

### Suggesting Features

1. Open a new issue with the `enhancement` label
2. Describe the feature and why it would be useful
3. Provide examples of how it would be used

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit with clear messages (`git commit -m 'Add feature: description'`)
6. Push to your fork (`git push origin feature/your-feature`)
7. Open a Pull Request

### Coding Standards

- Use ES6+ syntax
- Follow existing code style
- Add comments for complex logic
- Keep functions small and focused
- Handle errors gracefully

### Adding New Tools

To add a new tool to the agent:

1. Add tool definition in `agent.js` `initializeTools()` method:

```javascript
{
  name: 'my_new_tool',
  description: 'Clear description of what the tool does',
  input_schema: {
    type: 'object',
    properties: {
      param1: {
        type: 'string',
        description: 'Parameter description'
      }
    },
    required: ['param1']
  }
}
```

2. Implement the tool logic in `executeTool()` method:

```javascript
case 'my_new_tool':
  const result = // your implementation
  spinner.succeed(`My tool: ${chalk.green('success')}`);
  break;
```

3. Test the tool with various inputs
4. Update README.md with the new tool
5. Add example usage in examples.js

### Testing

Before submitting a PR:

```bash
# Test basic functionality
npm start examples

# Test interactive mode
npm run dev

# Test specific example
node examples.js
```

### Documentation

- Update README.md if you add features
- Add JSDoc comments to functions
- Include usage examples

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Keep discussions professional

## Questions?

Feel free to open an issue for questions or reach out via discussions.

Thank you for contributing! 🚀
