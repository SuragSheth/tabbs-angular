var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var TabbSchema = new mongoose.Schema({
    businesses: [{type: Schema.Types.ObjectId, ref: 'Business'}],
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
})

module.exports = mongoose.model('Tabb', TabbSchema);
