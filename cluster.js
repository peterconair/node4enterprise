var cluster = require('cluster');
var numCPU = require('os').cpus().length;

if(custer.on('exit',function(worker,code,signal){
	console.log('worker' + worker.process.pid+'died');
});
else{
	app.listener(3000);
	console.log("My Service is listening to port 3000" + process.pid);
});