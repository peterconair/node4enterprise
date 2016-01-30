
var db = require('dao/base');
var _ = require('underscore');
var result = {status:200,message:"completed",result:{}};
db.className = "Contacts";

db.init({name:'root',password:'bj4free'});

var contactBiz = {};
contactBiz.add = function(item,callback){
	
	db.insertDoc(item,function(o){
		var r = _.clone(result);

		if(!o){
			r.status=510;
			r.message ="[Error add contact !] ";
		}
		r.result = o;
		callback(r);
	});
}

contactBiz.getAll = function(callback){
	db.selectAll(function(list){
		var r = _.clone(result);
		if(!list){
			r.status=511;
			r.message ="[Error get contacts !] ";
		}
		r.result = list;
		callback(r);
	});
}

contactBiz.update = function(params,callback){
	//console.log(params);
	var total =db.update(params.item,params.condition);
	callback(total);
}

contactBiz.delete = function(params,callback){
	var total = db.delete(params);
	callback(total);
}

module.exports = contactBiz;