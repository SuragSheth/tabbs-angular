var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	organization: String,
	zip: Number,
	city: String,
	accounttype: String,
	
});

mongoose.model('Employee', EmployeeSchema);
