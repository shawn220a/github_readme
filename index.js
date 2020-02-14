const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');

inquirer.prompt([
  {
    type: 'input',
    name: 'gitName',
    message: 'What is your GitHub username?'
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'What is your GitHub project\'s name?'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please write a short description of your project badass project?'
  },
  {
    type: 'list',
    name: 'license',
    message: 'What kind of license should your project have?',
    choices: ['GPL 3.0', 'MIT', 'ISC', 'Mozilla']
  },
  {
    type: 'input',
    name: 'install',
    message: 'What command should be run to install dependencies?',
    default: 'npm i'
  },
  {
    type: 'input',
    name: 'tests',
    message: 'What command should be run to run tests?',
    default: 'npm test'
  },
  {
    type: 'input',
    name: 'usage',
    message: 'What does the user need to know about using the repo?'
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'What does the user need to know about contributing to the repo?'
  }
]).then((answers) => {
  console.log(answers);

  const readme = generateReadme(answers);

  fs.writeFile('finishedReadme.md', readme, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Successfully wrote to finishedReadme.md");
  })
});

function generateReadme(answers) {
  return `# ${answers.projectName}
  [![GitHub license](https://img.shields.io/badge/license-GPL%203.0-blue.svg)](https://github.com/calvincarter/demo_day_project2)
  ​
  ## Description
  ​
  ${answers.description}
  ​
  ## Table of Contents 
  ​
  * [Installation](#installation)
  ​
  * [Usage](#usage)
  ​
  * [License](#license)
  ​
  * [Contributing](#contributing)
  ​
  * [Tests](#tests)
  ​
  * [Questions](#questions)
  ​
  ## Installation
  ​
  To install necessary dependencies, run the following command:
  ​
  \`\`\`
  ${answers.install}
  \`\`\`​

  ## Usage
  ​
  ${answers.usage}
  ​
  ## License
  ​
  This project is licensed under the ${answers.license} license.
    
  ## Contributing
  ​
  ${answers.contributing}
  ​
  ## Tests
  ​
  To run tests, run the following command:

  \`\`\`
  ${answers.tests}
  \`\`\`
 
  ## Questions
  ​
  <img src="https://avatars1.githubusercontent.com/u/4831868?v=4" alt="avatar" style="border-radius: 16px" width="30" />
  ​
  If you have any questions about the repo, open an issue or contact [${answers.gitName}](https://api.github.com/users/calvincarter).`;
}


