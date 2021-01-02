const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

var exec = require("child_process").execFile;
// exec.cw = __dirname;
/**
 * Function to execute exe
 * @param {string} fileName The name of the executable file to run.
 * @param {string[]} params List of string arguments.
 * @param {string} path Current working directory of the child process.
 */
function execute(fileName, params, path) {
  let promise = new Promise((resolve, reject) => {
    exec(fileName, params, { cwd: path }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
      console.log(data);
    });
  });
  return promise;
}

const path = require("path");
const filepath = path.join(__dirname + "/../build/InfectionModelling");
execute(filepath);
