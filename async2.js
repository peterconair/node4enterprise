var fs = require("fs");
require('rootpath')();
var filename1 = "resources/contacts.txt";
var filename2 = "resources/contacts2.txt";
var filename3 = "resources/contacts3.txt";
var duration =0;
var startTime = new Date().getTime();

fs.readFile(filename1, function (err, data) {
  if (err) throw err;

  console.log('File :',filename1);
  console.log(data);
	var endTime = new Date().getTime();
	console.log("duration [ms] = " + (endTime-startTime));
  console.log(data);
  duration+=(endTime-startTime);

    startTime = new Date().getTime();
    fs.readFile(filename2, function (err, data) {
    if (err) throw err;
      
      console.log('File :',filename2);
      console.log(data);
      endTime = new Date().getTime();
      console.log("duration [ms] = " + (endTime-startTime));
      console.log(data);
      duration+=(endTime-startTime);

      startTime = new Date().getTime();
      fs.readFile(filename3, function (err, data) {
      if (err) throw err;
        
        console.log('File :',filename3);
        console.log(data);
        endTime = new Date().getTime();
        console.log("duration [ms] = " + (endTime-startTime));
        console.log(data);
        duration+=(endTime-startTime);
        console.log('duration:',duration,'ms');
      });
  });

});




