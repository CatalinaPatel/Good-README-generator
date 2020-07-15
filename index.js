const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
const generate = require('./utils/generateMarkdown');

const questions = [
    {
        type: "input",
        name: "title",
        message: "Enter project title"
    },

    {
        type: "input",
        name: "description",
        message: "Enter project description"
    },
    {
        type: "input",
        name: "installation",
        message: "Enter installation instructions"
    },
    {
        type: "input",
        name: "usage",
        message: "Explain project usage"
    },
    {
        type: "input",
        name: "licence",
        message: "Please provide the project licence or your badge link"
    },
    {
        type: "input",
        name: "contributing",
        message: "Enter contributing partners"
    },
    {
        type: "input",
        name: "license",
        message: "Select license"
    },
    {
        type: "input",
        name: "test",
        message: "Enter the project tests"
    },
    {
        type: "input",
        name: "username",
        message: "Enter your github user name?"
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email"
    },
];

inquirer
    .prompt(questions)
    .then(function (data) {
        const queryUrl = `https://api.github.com/users/${data.username}`;

        axios.get(queryUrl).then(function (res) {

            const githubInfo = {
                githubImage: res.data.avatar_url,
                email: res.data.email,
                profile: res.data.html_url,
                name: res.data.name
            };

            fs.writeFile("README.md", generate(data, githubInfo), function (err) {
                if (err) {
                    throw err;
                };

                console.log("New README file created with success!");
            });
        });

    });

function init() {

}

init();