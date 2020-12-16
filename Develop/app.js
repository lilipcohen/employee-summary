const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = ([
    {type: 'list',
      message: 'What is your role?',
      choices: ["engineer", "intern", "manager"],
      name: 'role',
      when: () => true 
    }, 
    {type: 'input',
      message: 'What is your github username',
      name: 'github',
      when: (answers) => answers.role === 'engineer'
    },
    {type: 'input',
      message: 'What school are you attending?',
      name: 'school',
      when: (answers) => answers.role === 'intern'
    },
    {type: 'input',
      message: 'What is your office number?',
      name: 'officeNumber',
      when: (answers) => answers.role === 'manager'
    },
    {type: 'input',
      message: 'Enter your name:',
      name: 'name',
    },
    {type: 'input',
      message: 'Enter your email address:',
      name: 'email',
    },
    {type: 'input',
      message: 'Enter your ID:',
      name: 'id',
    }
]);

const employees = [];
inquirer.prompt(questions).then((answers) => {
    const e = new Engineer(answers.name, answers.github, answers.id, answers.email);
    const i = new Intern(answers.name, answers.school, answers.id, answers.email);
    const m = new Manager(answers.name, answers.officeNumber, answers.id, answers.email);
    employees.push(e);
    employees.push(i);
    employees.push(m);
    render(employees);
    writeToFile("Team-Summary", render(employees))
})

function writeToFile(fileName, data) {
    fs.writeFileSync(`output-${fileName}.html`, data);
}

// 1) ask user questions
// 2) from answers determine what kind of employee they want to create
// 3) use matching contructor to create that employee
// 4) add new employee object to an array
// 5) ask user if they want to create another one or finished
// 6) if not finished repeat steps 1 through 5 (call function handles asking questions if do if not call function to write to file)


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
