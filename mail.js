/*var app = require('express')(),
    mailer = require('express-mailer');
 
mailer.extend(app, {
  from: 'apaichon@iberdroid.co.th',
  host: 'mail.iberdriod.co.th', // hostname 
  secureConnection: false, // use SSL 
  port: 25, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'apaichon@iberdroid.co.th',
    pass: 'pup1311'
  }
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.mailer.send('email', {
    to: 'apaichon@gmail.com,apaichon@iberdroid.co.th,apaichon@thaiprogrammer.org', // REQUIRED. This can be a comma delimited string just like a normal email to field.  
    subject: 'Test Email', // REQUIRED. 
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
  }, function (err) {
    if (err) {
      // handle error 
      console.log(err);

      //res.send('There was an error sending the email');
      return;
    }
    console.log('Email sent');
    //res.send('Email Sent');
  });*/

/*var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var smtpTransport = require('nodemailer-smtp-transport');
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails
var transporter = nodemailer.createTransport(smtpTransport({
    host: 'mail.iberdroid.co.th',
    port: 25,
    auth: {
        user: 'apaichon@iberdroid.co.th',
        pass: 'pup1311'
    }
}));
*/
/*var transporter = nodemailer.createTransport(
    smtpTransport('smtps://apaichon%40gmail.com:iBerdr0id@smtp.gmail.com')
);*/
// setup e-mail data with unicode symbols
/*var mailOptions = {
    from: 'apaichon@iberdroid.co.th', // sender address
    to: 'apaichon@gmail.com, apaichon@hotmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);

});*/


var email   = require("emailjs");
var server  = email.server.connect({
   user:    "apaichon@iberdroid.co.th", 
   password:"pup1311", 
   host:    "mail.iberdroid.co.th", 
   ssl:     false
});

var fs =require('fs');
require('rootpath')();
var filename ="views/nodejs.html";
var template = fs.readFileSync(filename, "utf8");


//var Tos =[{name:"Apaihchon1",email:"apaichon@gmail.com"}
//,{name:"อภัยชนม์",email:"apaichon@hotmail.com"}];

var Tos = require('data/emailTo ');
var exceptMail = require('data/exceptMail');
var _ = require('underscore');

var message = {
   text:    "", 
   from:    "apaichon@iberdroid.co.th", 
   to:      "apaichon@hotmail.com,apaichon@gmail.com",
   //cc:      "else <else@your-email.com>",
   subject: "เปิดรับสมัครแล้วคอร์ส NodeJS for Enterprise",
   attachment: 
   [
      {data:template, alternative:true},
     // {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
   ]
};

Tos =_.uniq(Tos, function( x ){
    return JSON.stringify( x );
});

exceptMail =_.uniq(exceptMail, function( x ){
    return JSON.stringify( x );
});

var excepts = _.pluck(exceptMail,"email");

function filter(data, field, values) {
   return _.filter(data, function(item){ return !_.contains(values, item[field]); })
}
Tos =filter(Tos,'email',excepts);
//Tos =_.without(Tos,exceptMail);
//console.log('Tos',Tos);
//console.log('Excepts',excepts);
/*Tos.forEach(function(a){
  message.to = a.email;
  var n = template.replace('{{name}}',a.firstName +' ' + a.lastName);
  message.attachment[0].data = n;
  
    console.log( '[' + new Date().toISOString() +'] send to ');
    server.send(message, function(err, message) { console.log(err || a); });
});*/
function sendMail(a){
   message.to = a.email;
  var n = template.replace('{{name}}',a.firstName +' ' + a.lastName);
  message.attachment[0].data = n;
  
    console.log( '[' + new Date().toISOString() +'] send to ');
    server.send(message, function(err, message) { console.log(err || a); });
}

var i = 0, howManyTimes = Tos.length;
function f() {
    sendMail(Tos[i]);
    i++;
    if( i < howManyTimes ){
        setTimeout( f, 3000 );
    }
}
f();

// send the message and get a callback with an error or details of the message that was sent
//server.send(message, function(err, message) { console.log(err || message); });