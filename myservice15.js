var express = require("express");

require('rootpath')();
var app = express();
var bodyParser = require('body-parser');
var helmet = require('helmet');
var loki = require('lokijs');
var authentication = require('libs/authentication');
var session = require('express-session');
//สร้างฐานข้อมูลชื่อ UserDB
var memdb = new loki('UserDB');
//สร้างตารางชื่อ users, index ชื่อ name เพื่อเก็บข้อมูล user ที่มีสิทธิใช้งาน
var users = memdb.addCollection('users', { indices: ['name'] });
//สร้างตารางชื่อ logonList, index ชื่อ sessionID เพื่อเก็บข้อมูลผู้เข้าใช้
var logonList = memdb.addCollection('logonList', { indices: ['sessionID'] });
//สร้างตารางชื่อ expeptUrls , index ชื่อ url เพื่อเก็บข้อมูล url ที่ยอมให้เข้าถึงได้โดยไม่ต้องตรวจสอบ
var exceptUrls = memdb.addCollection('exceptUrls', { indices: ['url'] });

users.insert({name:"admin",password:"p@ssw0rd"});
exceptUrls.insert({url:"/security/authorize/login"});
exceptUrls.insert({url:"/security/authorize/logout"});
/*exceptUrls.insert({url:"/crm/contacts/getAll"});
exceptUrls.insert({url:"/crm/contacts/add"});
exceptUrls.insert({url:"/crm/contacts/update"});
exceptUrls.insert({url:"/crm/contacts/delete"});*/

var auth = new authentication(users,logonList,exceptUrls);

//global Members
app.logonList = logonList;
app.users =users;

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3600000 }}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var isAuthorized =false;

app.use(helmet());

app.all('*',checkAuthorize,executeApi);


function checkAuthorize(req,res,next){
	var status = auth.checkAuthorize(req,res);
	//console.log(status,req.sessionID);
	console.log(status);
	if(status.code==200){
		isAuthorized = true;
		next();
	}
	else
		res.send(status);
}

function executeApi(req,res,next){
	//console.log('executeApi',req);
	//console.log(isAuthorized);
	app.sessionID = req.sessionID;
	app.ip =req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	if(isAuthorized){
		//console.log(req.method);
		//res.send('Executed Api');
		switch(req.method){
			case "GET":
				execGet(req,res,next);
			break;
			case "POST":
				execPost(req,res,next);
			break;
			case "PUT":
				execPost(req,res,next);
			break;
			case "DELETE":
				execPost(req,res,next);
			break;
		}
	}
		//res.send('Executed Api');
}

function execGet(req,res,next){
	var params = req.params[0].split('/');
	//[0]- empty,[1]-module,[2]-object,[3]-function,[4-n] params..n
	if(params.length <4)
		res.send({code:530,status:"error",message:"Invalid parameters!"});
	else{
		var obj = require('api/'+params[1]+'/' +params[2]);
		obj = new obj(app);
		var func =obj[params[3]];
		var inputs =[];
		for(var i=4;i<params.length;i++){
			if(params[i])
				inputs.push(params[i]);
		}
		func(inputs,function(result){
			res.send(result);
		});
	}

}
function execPost(req,res,next){
	var params = req.params[0].split('/');
	//[0]- empty,[1]-module,[2]-object,[3]-function,[4-n] params..n
	if(params.length <4)
		res.send({code:530,status:"error",message:"Invalid parameters!"});
	else{
		var obj = require('api/'+params[1]+'/' +params[2]);
		obj = new obj(app);
		var func =obj[params[3]];
		func(req.body,function(result){
			console.log('result',result);
			res.send(result);
		});
	}

}

app.listen(3000);
console.log("My Service is listening to port 3000. pid:" +process.pid);

process.on('uncaughtException', function (err) {
  console.error((new Date).toISOString() + ' '+process.pid +' uncaughtException:', err.message);
});
