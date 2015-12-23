var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EmployeeSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	_business: {type: Schema.ObjectId, ref: 'Business'}

});

mongoose.model('Employee', EmployeeSchema);
