var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var StaffSchema = new Schema({

	staffId: Number,
	firstName:  String,
	lastName:  String,
	password: String,
	role: Number,
	email: String,
	mobileNumber:Number,
	designation: String,
	domain: String,
	registeration_time: Date,
	maritalStatus: String,
	isBlocked: Boolean,
	isDeleted: Boolean,
	dob: String,


});




module.exports = mongoose.model("staff",StaffSchema);