// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./employee");

class Engineer extends Employee {
  constructor(github, type, crew) {
    super(name, "Engineer", "bwom");
    this.name = name;
    this.role = "Engineer";
  }
  getRole() {
    return this.role = "Engineer";
  }
  getGithub() {
      return this.github;
  }
}

const engineer = new Engineer(github);