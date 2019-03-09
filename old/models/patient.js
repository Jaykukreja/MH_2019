var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var PatientSchema = new Schema({
	
	patientId: Number,
	firstName:  String,
	lastName:  String,
	mobileNumber: Number,
	registeration_time: Date,
	email: String,
	occupation: String,
	maritalStatus: String,
	gender: String,
	dob: String,
	insured: String,

});


module.exports = mongoose.model("patient",PatientSchema);  