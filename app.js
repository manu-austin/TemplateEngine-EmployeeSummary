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

// cards
const managerCard = require('./templates/managerhtml');
const internCard = require('./templates/internhtml');
const engineerCard = require('./templates/engineerhtml');

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
        const manager = new Manager(
            response.managerName,
            response.managerID,
            response.managerEmail,
            response.officeNumber
        );

        const managerCard = managerCard(manager);
        myTeam.push(managerCard);
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
            switch (response.otherTeamMember) {
                case "Intern":
                    addIntern();
                    break;
                case "Engineer":
                    addEngineer();
                    break;
                case "No more members":
                    CreateTeam();
                    break;
            }

        })
};


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
        const manager = new Manager(
            response.managerName,
            response.managerID,
            response.managerEmail,
            response.officeNumber
        );

        const managerCard = managerCard(manager);
        myTeam.push(managerCard);
        otherTeamMember();
    })

};

// runs the function
promptUser();

//  {
//     type: "list",
//     name: "licenseList",
//     message: "Please pick a license for this application from the list below",
//     choices: [
//         "Apache License 2.0",
//         "BSD 3-Clause 'New' or 'Revised' license",
//         "BSD 2-Clause 'Simplified' or 'FreeBSD' license",
//         "GNU General Public License (GPL)",
//         "GNU Library or 'Lesser' General Public License (LGPL)",
//         "MIT license",
//         "Mozilla Public License 2.0",
//         "Common Development and Distribution License",
//         "Eclipse Public License version 2.0",
//     ]
// },