var express = require("express");

require('rootpath')();
var app = express();
var bodyParser = require('body-parser');
var helmet = require('helmet');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(helmet());

app.get('/', function (req, res) {
  console.log("Hello World!");
  res.send('Hello World');
});

app.post('/contacts/add',function(req,res){
	var contactBiz = require('biz/contactBiz');
	contactBiz.add(req.body,function(result){
		res.send(result);
		delete contactBiz;
	});
});

app.get('/contacts/getAll',function(req,res){
	var contactBiz = require('biz/contactBiz');
	contactBiz.getAll(function(result){
		res.send(result);
		delete contactBiz;
	});
});

app.put('/contacts/update',function(req,res){
	var contactBiz = require('biz/contactBiz');
	contactBiz.update(req.body,function(result){
		res.send(result);
		delete contactBiz;
	});
});

app.delete('/contacts/delete',function(req,res){
	var contactBiz = require('biz/contactBiz');
	contactBiz.delete(req.body,function(result){
		res.send(result);
		delete contactBiz;
	});
});

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
	app.listen(3000);
	console.log("My Service is listening to port 3000." +process.pid);
}

process.on('uncaughtException', function (err) {
  console.error((new Date).toISOString() + ' uncaughtException:', err.message);
});
