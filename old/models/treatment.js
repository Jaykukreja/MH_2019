var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TreatmentSchema = new Schema({

	treatmentId: String,
	patientId: String,
	doctorId: Array,
	date: Date,
	symptoms: Array,
	description: String,
	prescription: [{date: Date,links: Array}],
	reports: [{date: Date,links: Array}],
	
		
});

module.exports = mongoose.model("treatment",TreatmentSchema);