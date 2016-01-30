var express = require("express");

require('rootpath')();
var app = express();
var bodyParser = require('body-parser');
var helmet = require('helmet');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(helmet());

app.get('/', function (req, res) {
  console.log("Hello World!");
  res.send('Hello World');
})

app.listen(3000);
console.log("My Service is listening to port 3000.");

process.on('uncaughtException', function (err) {
  console.error((new Date).toISOString() + ' uncaughtException:', err.message);
});
