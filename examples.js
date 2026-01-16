import TaskAutomationAgent from './agent.js';
import dotenv from 'dotenv';

dotenv.config();

// Example 1: Simple file creation
async function example1() {
  console.log('\n=== Example 1: Create a simple file ===\n');
  
  const agent = new TaskAutomationAgent(process.env.ANTHROPIC_API_KEY);
  await agent.processTask('Create a file called hello.txt with the content "Hello, World!"');
}

// Example 2: Project structure creation
async function example2() {
  console.log('\n=== Example 2: Create project structure ===\n');
  
  const agent = new TaskAutomationAgent(process.env.ANTHROPIC_API_KEY);
  await agent.processTask(`Create a Node.js project structure:
    - src/
      - routes/
      - controllers/
      - models/
      - utils/
    - tests/
    - config/
  `);
}

// Example 3: Data processing
async function example3() {
  console.log('\n=== Example 3: Process data ===\n');
  
  const agent = new TaskAutomationAgent(process.env.ANTHROPIC_API_KEY);
  await agent.processTask(`Create a sample users.json file with 3 users, 
    then read it and create a new file filtered-users.json with only users older than 25`);
}

// Example 4: API interaction
async function example4() {
  console.log('\n=== Example 4: Fetch and save API data ===\n');
  
  const agent = new TaskAutomationAgent(process.env.ANTHROPIC_API_KEY);
  await agent.processTask(`Fetch data from https://api.github.com/repos/nodejs/node/releases/latest 
    and save the tag_name and published_at to github-release.json`);
}

// Example 5: Code generation
async function example5() {
  console.log('\n=== Example 5: Generate React component ===\n');
  
  const agent = new TaskAutomationAgent(process.env.ANTHROPIC_API_KEY);
  await agent.processTask(`Create a React component file Button.jsx with:
    - A functional component that accepts props: text, onClick, variant
    - Use Tailwind CSS classes
    - Support variants: primary, secondary, danger
  `);
}

// Run examples
async function runExamples() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY not found in .env file');
    process.exit(1);
  }

  try {
    // Uncomment the example you want to run:
    
    await example1();
    // await example2();
    // await example3();
    // await example4();
    // await example5();
    
  } catch (error) {
    console.error('Error running example:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runExamples();
}

export { example1, example2, example3, example4, example5 };
