const fs = require('fs');
const util = require("util");
const inquirer = require('inquirer');
const axios = require('axios');

const writeFileSync = util.promisify(fs.writeFile);

let response = '';
let readme = '';

function promptUser() {
  return inquirer.prompt([
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
  ]);
}

function generateReadme(response, answers, answersURL) {
  return `# ${answers.projectName}
  [![License](${answersURL})](${response.html_url}/${answers.projectName})
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
  \`\`\`

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
  <img src="${response.avatar_url}" alt="avatar" style="border-radius: 16px" width="30" />
  ​
  If you have any questions about the repo, open an issue or contact [${response.login}](${response.html_url}).`;
}

promptUser()
  .then(function(answers) {

    if (answers.license === 'Mozilla') {
      answersURL = 'https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg'
    }
    if (answers.license === 'MIT') {
      answersURL = 'https://img.shields.io/badge/License-MIT-yellow.svg'
    }
    if (answers.license === 'ISC') {
      answersURL = 'https://img.shields.io/badge/License-ISC-blue.svg'
    }
    if (answers.license === 'GPL 3.0') {
      answersURL = 'https://img.shields.io/badge/License-GPLv3-blue.svg'
    }

    axios.get(`https://api.github.com/users/${answers.gitName}`)
      .then((res) => {
        response = res.data;
        readme = generateReadme(response, answers, answersURL);
        return writeFileSync("finishedReadme.md", readme);
      })
      
  })
  .catch(function(err) {
    console.log(err);
  });