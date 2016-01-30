var fs = require("fs");
require('rootpath')();
var filename1 = "resources/contacts.txt";
var filename2 = "resources/contacts2.txt";
var filename3 = "resources/contacts3.txt";
var duration =0;
var startTime1 = new Date().getTime();

fs.readFile(filename1, function (err, data) {
  if (err) throw err;

  	console.log('File :',filename1);
  	console.log(data);
	var endTime = new Date().getTime();
	console.log("duration [ms] = " + (endTime-startTime1));
  	console.log(data);
  	duration+=(endTime-startTime1);
});

var startTime2 = new Date().getTime();
fs.readFile(filename2, function (err, data) {
  if (err) throw err;
  	
  	console.log('File :',filename2);
  	console.log(data);
	var endTime = new Date().getTime();
	console.log("duration [ms] = " + (endTime-startTime2));
  	console.log(data);
  	duration+=(endTime-startTime2);
});

var startTime3 = new Date().getTime();
fs.readFile(filename3, function (err, data) {
  if (err) throw err;
  	
  	console.log('File :',filename3);
  	console.log(data);
	var endTime = new Date().getTime();
	console.log("duration [ms] = " + (endTime-startTime3));
  	console.log(data);
  	duration+=(endTime-startTime3);
});

console.log('duration:',duration,'ms');