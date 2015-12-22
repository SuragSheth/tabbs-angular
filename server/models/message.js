var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
  to: String,
  from: String,
  body: String,
  created_at: {type: Date},
  fromCity: String,
  fromState: String,
  sid: String,
  _message: {type: Schema.Types.ObjectId, ref: 'Message'},
  _tabb: {type: Schema.Types.ObjectId, ref: 'Tabb'}

});

mongoose.model('Message', MessageSchema);
