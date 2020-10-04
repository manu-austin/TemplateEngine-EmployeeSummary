// classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

// npm packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// create variable for the team file path - join so that it goes well on any device and browser
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// create team array manager + engineer(s) + intern(s)
const myTeam = [];

// first questions to user about the manager - name, ID, Emmail
function promptUser() {

    inquirer.prompt([{
            type: "input",
            name: "managerName",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "managerID",
            message: "What is the manager's ID?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is the manager's Email??"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's phone number?"
        },
    ])

    .then(response => {
        // create new object and fill info 
        myTeam.push(new Manager(
            response.managerName,
            response.managerID,
            response.managerEmail,
            response.officeNumber
        ));

        otherTeamMember();
    })


};

function otherTeamMember() {
    inquirer.prompt([{
            type: "list",
            name: "memberType",
            message: "What member type would you like to add?",
            choices: [
                "Intern",
                "Engineer",
                "No more members"
            ]
        }])
        .then(response => {
            switch (response.memberType) {
                case "Intern":
                    addIntern();
                    break;
                case "Engineer":
                    addEngineer();
                    break;
                case "No more members":
                    createTeam();
                    break;
            }

        })
};


function addIntern() {

    inquirer.prompt([{
            type: "input",
            name: "internName",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "internID",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's Email??"
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the intern's school?"
        },
    ])

    .then(response => {
        // create new object and fill info 
        myTeam.push(new Intern(
            response.internName,
            response.internID,
            response.internEmail,
            response.internSchool
        ));

        otherTeamMember();
    })



};

// prompt to ask question about engineer 

function addEngineer() {

    inquirer.prompt([{
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "engineerID",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's Email??"
        },
        {
            type: "input",
            name: "engineerGitHub",
            message: "What is the engineer's GitHub?"
        },
    ])

    .then(response => {
        // create new object and fill info 
        myTeam.push(new Engineer(
            response.engineerName,
            response.engineerID,
            response.engineerEmail,
            response.engineerGitHub
        ));

        otherTeamMember();
    })

};

// create html file with the team
function createTeam() {

    fs.writeFileSync(outputPath, render(myTeam), 'utf-8');

};

// runs the function
promptUser();