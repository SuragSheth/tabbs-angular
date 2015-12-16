var mongoose = require('mongoose');
var Message = mongoose.model('Message');

module.exports = (function(){
  return {
    add_message: function(req, res){
      var new_message = new Message ({
            to: req.body.To,
            from: req.body.From,
            body: req.body.Body,
            created_at: new Date(),
            fromCity: req.body.FromCity,
            fromState: req.body.FromState,
            sid: req.body.MessageSid
        })
        new_message.save(function(err, result){
          if(err){
              console.log("did not save message");
          } else{
              console.log("message saved");
              res.json(result);
          }
        })
      }
    }
})();
