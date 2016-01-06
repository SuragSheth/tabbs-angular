var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	company: String,
	phone: Number,
	tabbsphone: Number, 
	plan: String,
	// _employees: {type: Schema.ObjectId, ref: 'Employee'},
	created_at: {type: Date, default: new Date}

});

mongoose.model('Admin', AdminSchema);
