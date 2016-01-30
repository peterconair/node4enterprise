function authentication(users,logonList,exceptUrls){
	var that = this;
	this.users = users;
	this.logonList = logonList;
	this.exceptUrls =exceptUrls;

	this.checkAuthorize = function(req,res){
		//console.log(req);
		//var urls = req.originalUrl.split('/');
		//console.log('originalUrl',req.originalUrl);
		//console.log('before',urls);
		//urls.splice(4);
		//console.log('after',urls);
		//var url =urls.join('/');

		var allowUrls =that.exceptUrls.find({url:req.originalUrl});
		//console.log('url:',url,'allow:',allowUrls);
		if(allowUrls.length >0)
			return that.getMessage(200);
		else
			return that.checkLogonSession(req.sessionID);
	}

	this.checkLogonSession =function(sessionID){
		var logon =that.logonList.find({"sessionID":sessionID});
		if(logon.length >0)
			return that.isLogonExpired(logon[0]);
		else
			return that.getMessage(521);
	}

	this.isLogonExpired=function(logon){
		if(logon.expiredAt <= new Date().getTime())
			return that.getMessage(522);
		else
			return that.getMessage(200);
	}

	this.getMessage = function(code){
		switch(code){
			case 200:
			return {code:code,status:"completed",message:"Authorized"};
			case 520:
			return {code:code,status:"error",message:"Not allow api!"}
			case 521:
			return {code:code,status:"error",message:"Unauthorized!"}
			case 522:
			return {code:code,status:"error",message:"Session Expired!"}
		}
	}

}
module.exports = authentication;