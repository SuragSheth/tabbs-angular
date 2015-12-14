var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var BusinessSchema = new mongoose.Schema({
  local: {
    name: String,
    email: String,
    number: Number,
    password: String,
    accounttype: String
  }
})


//methods =============================
//generate hash
BusinessSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
};

// checking if password is valid
BusinessSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('Business', BusinessSchema);
