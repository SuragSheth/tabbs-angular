var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	company: String,
	phone: Number,
	tabbsphone: Number, 
	plan: String

});

mongoose.model('Admin', AdminSchema);
