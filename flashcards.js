

var inquirer = require('inquirer');
var content = require('./content.json')
var basic;


var Basic = function() {
  this.question = content.president.basic.question,
  this.answer = content.president.basic.answer,
  this.action = function() {
    inquirer.prompt([
    {
        type: "list",
        message: "Read or make a card?",
        choices: ["Read","Make"],
        name: "choice"
      }
    ]).then(function(answers) {
      if (answers.choice === "Read") {
        console.log(this.question);

      }
    })
  }
}



var start = function() {
  basic = new Basic();
    inquirer.prompt([
        {
          type: "list",
          message: "Would you like the basic or cloze card game?",
          choices: ["Basic","Cloze Card"],
          name: "choice"
        }
    ]).then(function (answers) {
        if(answers.choice === "Basic") {
          basic.action();

        } else {
          cloze();
        }
    });
}


start();










var restart = function() {
     inquirer.prompt([
      {
        type: "list",
        message: "Would you like another search?",
        choices: ["Yes","Quit session"],
        name: "choice"
      }
  ]).then(function (answers) {
    if(answers.choice === "Yes"){
      start();
    } else {
      connection.end();
    }
  });
}
