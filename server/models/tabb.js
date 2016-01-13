var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TabbSchema = new mongoose.Schema({
    tabb_user_id: String,
    tabb_business_id: String,
    businesses: [{type: Schema.Types.ObjectId, ref: 'Business'}],
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    number_of_messages: Number,
    created_at: {type: Date, default: new Date},
    updated_at: {type: Date, default: new Date} 
})

module.exports = mongoose.model('Tabb', TabbSchema);
