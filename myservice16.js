var express = require("express");

require('rootpath')();
var app = express();
var bodyParser = require('body-parser');
var helmet = require('helmet');
var loki = require('lokijs');
var authentication = require('libs/authentication');
var session = require('express-session');
var memdb = new loki('UserDB');
var users = memdb.addCollection('users', { indices: ['name'] });
var logonList = memdb.addCollection('logonList', { indices: ['sessionID'] });
var exceptUrls = memdb.addCollection('exceptUrls', { indices: ['url'] });
var winston = require('winston');
var useragent = require('useragent');
var _guid ="";
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

app.all('*',getGuid,writeReqLog,checkAuthorize,executeApi);


function checkAuthorize(req,res,next){
	var status = auth.checkAuthorize(req,res);
	//console.log('SessionID Authorize :',req.sessionID);
	//console.log('conenct id :',req.connect.sid);
	//console.log(status);
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
	//console.log('Session ID Execute',req.sessionID);
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
		try{
			var obj = require('api/'+params[1]+'/' +params[2]);
			obj = new obj(app);
			var func =obj[params[3]];
			func(req.body,function(result){
				//console.log('result',result);
				res.send(result);
				writeResLog(req,'info',result);
			});
		}
		catch(err){
			res.send({code:500,status:"error",message:JSON.stringify(err) });
			writeResLog(req,'error',err);
		}
	}

}
function getGuid(req,res,next){
	var Guid = require('guid');
	_guid = Guid.create();
	req.guid = _guid;
	next();
}

function writeReqLog(req,res,next){
	writeLog('info','start',req);
	next();
}

function writeResLog(req,level,result){
	writeLog(level,'end',req,result);
}

function writeLog(level,step,req,result){
	var log = {};
	var now = new Date();
	var fileName = now.toISOString().substring(0,10);
	log.step = step;
	
	switch(step){
		case "start":
			log = getReqLog(log,req);
		break;
		case "end":
			log = getResLog(log,level,req,result);
		break;
		
	}
	
	//2016-01-12T08:41:00.845Z
	  var logger = new winston.Logger({
		level: level,
		transports: [
			  new (winston.transports.Console)(),
			  new (winston.transports.File)({ filename: 'logs/'+fileName+ '.log' })
			]
		});
		console.log(log);
		logger.log(level, log);
	
}

function getReqLog(log,req){
	log.guid = req.guid;
	log.sessionID = req.sessionID;
	log.ip =req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var user =logonList.findOne({sessionID:req.sessionID});
	if(user)
		log.userName = user.userName;
	log.url = req.params;
	log.method = req.method;
	var agent = useragent.parse(req.headers['user-agent']);
	log.os = agent.os;
	log.device = agent.device;
	
	return log;
}

function getResLog(log,level,req,result){
	log.guid = req.guid;
	if(level=='info')
		log.result  = result;
	else
		log.message = result;
	
	return log;
}

app.listen(3000);
console.log("My Service is listening to port 3000. pid:" +process.pid);

process.on('uncaughtException', function (err) {
  //console.error((new Date).toISOString() + ' '+process.pid +' uncaughtException:', err.message);
var rq = {guid:_guid}
  writeResLog(rq,'error',process.pid +' uncaughtException:' + JSON.stringify(err));
});

