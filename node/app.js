const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const include_path = __dirname + "/js";
// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(include_path));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

app.listen(port, () => {
  console.log(`Simulation-Endpoint listening at http://localhost:${port}`);
});

app.post("/", (req, res) => {
  const filepath = path.join(__dirname + "/../build/InfectionModelling");
  var config = JSON.stringify(req.body);
  console.log(config);
  fs.writeFileSync(path.join(__dirname + "/../config.json"), config);
  execute(filepath);
  // res.send("Simulation started..");
});

var exec = require("child_process").execFile;
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
////////////////////////////////
// File server for CSV
const ecstatic = require("ecstatic");
const http = require("http");

const app2 = express();
app2.use(cors());
app2.use(
  ecstatic({
    root: `${__dirname}/CSV`,
    showdir: true,
  })
);
const fileport = 8080;
http.createServer(app2).listen(fileport);

console.log(`File server listening at http://localhost:${fileport}`);
