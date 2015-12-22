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
<<<<<<< HEAD
  	_business: {type: Schema.Types.ObjectId, ref: 'Business'}
=======
  _business: {type: Schema.Types.ObjectId, ref: 'Business'}
>>>>>>> 4efa4797c087d082323b48d8661c116e0ab29137

});

mongoose.model('Employee', EmployeeSchema);
