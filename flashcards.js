

var inquirer = require('inquirer');
var mysql = require('mysql');

var count = 0;

//Connects to mySQL server
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'cloze_cards'
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});



var start = function() {
    inquirer.prompt([
        {
          type: "list",
          message: "Would you like the basic or cloze card game?",
          choices: ["Basic","Cloze Card"],
          name: "choice"
        }
    ]).then(function (answers) {
        if(answers.choice === "Basic") {
          basic();

        } else {
          cloze();
        }
    });
}

var cloze = function() {
  connection.query("SELECT * FROM cloze", function(err, res){
    if(err) throw err;
    if (count>res.length-1){
      count = 0;
    }
    var str = res[count].choices;
    var options = str.split(",");
    // console.log(options);
    inquirer.prompt([
      {
        type: "list",
        message: res[count].partial,
        choices: options,
        name: "choice"
      }
    ]).then(function(answers){
      if(answers.choice === res[count].cloze){
        console.log("Correct!");
        console.log(res[count].full);
        setTimeout(restart2,3000);
      } else {
        console.log("Incorrect!");
        console.log(res[count].full);
        setTimeout(restart2,3000);
      }
    });
  });
}



var basic = function() {
  inquirer.prompt([
      {
        type: "list",
        message: "Read or Make a card?",
        choices: ["Read","Make"],
        name: "choice"
      }
  ]).then(function (answers) {
      if(answers.choice === "Read") {
        connection.query("SELECT * FROM basic", function(err, res){
          if (err) throw err;
          if (count>res.length-1){
            count = 0;
          }
          console.log(res[count].question);
          var answer = function(){console.log(res[count].answer)};
          setTimeout(answer,1500);
          setTimeout(restart,3000);
        })
      } else {
        inquirer.prompt([
            {
              type: "input",
              message: "What question would you like to ask?",
              name: "question"
            },
            {
              type: "input",
              message: "What is the answer?",
              name: "answer"
            }
        ]).then(function (answers) {
          connection.query("INSERT INTO basic SET ?", {question: answers.question, answer: answers.answer},
            function(err, res) {
            if (err) throw err;
            console.log("Your question: "+ answers.question);
            console.log("Answer: "+ answers.answer);
            console.log("Added successfully!");
            setTimeout(restart,1500);
            });
        });
      }
  });
}







var restart = function() {
     inquirer.prompt([
      {
        type: "list",
        message: "Would you like another card?",
        choices: ["Yes","Return to main menu","Quit session"],
        name: "choice"
      }
  ]).then(function (answers) {
    if(answers.choice === "Yes"){
      basic();
      count++
    } else if(answers.choice === "Return to main menu") {
      start();
    } else {
      connection.end();
    }
  });
}

var restart2 = function() {
     inquirer.prompt([
      {
        type: "list",
        message: "Would you like another card?",
        choices: ["Yes","Return to main menu","Quit session"],
        name: "choice"
      }
  ]).then(function (answers) {
    if(answers.choice === "Yes"){
      cloze();
      count++
    } else if(answers.choice === "Return to main menu") {
      start();
    } else {
      connection.end();
    }
  });
}
