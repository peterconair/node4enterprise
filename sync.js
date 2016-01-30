var fs = require("fs");
require('rootpath')();
var filename1 = "resources/contacts.txt";
var filename2 = "resources/contacts2.txt";
var filename3 = "resources/contacts3.txt";

var startTime = new Date().getTime();
var c1 = fs.readFileSync(filename1, "utf8");
console.log('File: contacts.txt');
console.log(c1);
var endTime = new Date().getTime();
console.log("duration [ms] = " + (endTime-startTime));

startTime = new Date().getTime();
var c2 = fs.readFileSync(filename2, "utf8");
console.log('File: contacts2.txt');
console.log(c2);
endTime = new Date().getTime();
console.log("duration [ms] = " + (endTime-startTime));

startTime = new Date().getTime();
var c3 = fs.readFileSync(filename3, "utf8");
console.log('File: contacts3.txt');
console.log(c3);
endTime = new Date().getTime();
console.log("duration [ms] = " + (endTime-startTime));