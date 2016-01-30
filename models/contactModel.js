var contactModel = {
	name:'Contacts',
	schema:{
		title: String,
    	firstName: String,
    	lastName: String,
    	birthDay: Date,
    	sex: String,
    	mobileNo : Number,
    	createdAt : Date,
    	modifiedAt : Date
	},
	collection:{
		collection:'Contacts'
	}
}

module.exports = contactModel;