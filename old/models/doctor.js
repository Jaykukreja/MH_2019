var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var DoctorSchema = new Schema({

	firstName:  String,
	lastName:  String,
	doctorId: Number,
	password: String,

});

// DoctorSchema.methods.hashPassword = function (password){
// 	return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
// }

// DoctorSchema.methods.comparePassword = function (password,hash){
// 	return bcrypt.compareSync(password,hash);
// }

module.exports = mongoose.model("doctor",DoctorSchema);