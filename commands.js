const fs = require("fs");


 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 }


 function evaluateCmd(userInput) {

   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
    case "echo":

      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;

      case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;

      case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;

      case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;

      default:
      commandLibrary.errorHandler()
  }
 }

 const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
    },

    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },

    "head": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            var text = data.toString()
            var splitted = text.split('\n');
            var output = splitted.splice(0, 10).join('\n')
            done(output);
        });
    },

    "tail": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            var text = data.toString()
            var splitted = text.split('\n');
            var output = splitted.splice(splitted.length - 10).join('\n')
            done(output);
        });
    },

    "errorHandler": function() {
        done ("Error: Not a command")
    },

 };

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;