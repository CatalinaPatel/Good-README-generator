const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
const generate = require("./utils/generateMarkdowns")

const questions = [
    {
        type: "input",
        name: "title",
        message: "Please enter your project's title"
    },
    {
        type: "input",
        name: "description",
        message: "Please enter your project's description"
    },
    {
        type: "input",
        name: "installation",
        message: "Please enter your project's step by step installation instructions"
    },
    {
        type: "input",
        name: "usage",
        message: "Please enter your project's usage instructions and examples"
    },
    {
        type: "input",
        name: "license",
        message: "Please enter license information"
    },
    {
        type: "input",
        name: "contributing",
        message: "Please enter contributing developer's information"
    },
    {
        type: "input",
        name: "test",
        message: "Please enter test instructions and examples"
    },
    {
        type: "input",
        name: "username",
        message: "Please enter your Github user name and repository link"
    },
    {
        type: "input",
        name: "email",
        message: "Please enter your email"
    },
    {
        type: "input",
        name: "credits",
        message: "Please enter your credits to collaborators or third parties "
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
            });
        });

    });

function init() {

}

init();