var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EmployeeSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	organization: String,
	zip: Number,
	city: String,
	accounttype: String,
  _business: {type: Schema.Types.ObjectId, ref: 'Business'}

});

mongoose.model('Employee', EmployeeSchema);
