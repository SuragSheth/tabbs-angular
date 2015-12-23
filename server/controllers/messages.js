var mongoose  = require('mongoose');
var Message   = mongoose.model('Message');
var Tabb      = mongoose.model('Tabb');
var Business  = mongoose.model('Business');

module.exports = (function(){
  return {
    incoming_message: function(req, res){
      //check if business exists by phone number
      //console.log("new_tabb", typeof req.body.To)
      Business.findOne({"local.number": req.body.To}, function(err, result){
        if(result == null){
          console.log("sorry, business does not exist");
        }
        else{
          console.log("valid business number - check if tabb exists");
          //check if conversation tabb already exists
          Tabb.findOne({tabb_user_id: req.body.From}, function(err, tabb){
            if(tabb == null){ //tabb does not exist yet
              var new_tabb = new Tabb ({
                tabb_user_id: req.body.From
              });
              new_tabb.save(function(err, result){
                if(err){
                  console.log("error trying to save new tabb");
                }
                else {
                  console.log("tabb saved successfully", result);
                  //save message and update tabb document by id
                  Tabb.findOne({_id: result._id}, function(err, tabb){
                    //data from the message
                    var new_message = new Message ({
                      to: req.body.To,
                      from: req.body.From,
                      body: req.body.Body,
                      created_at: new Date(),
                      fromCity: req.body.FromCity,
                      fromState: req.body.FromState,
                      sid: req.body.MessageSid,
                      _tabb: result._id
                    })

                    tabb.messages.push(new_message);
                    //save both updated tabb and new message
                    new_message.save(function(err){
                      tabb.save(function(err){
                        if(err){
                          console.log("error saving message and updated tabb");
                        }
                        else {
                          console.log("created initial tabb and saved first message");
                        }
                      })
                    })
                  })
                }
              })
            }
            //tabb already exists. Just save message
            else {
              Tabb.findOne({tabb_user_id: req.body.From}, function(err, tabb){
                //data from the message
                var new_message = new Message ({
                  to: req.body.To,
                  from: req.body.From,
                  body: req.body.Body,
                  created_at: new Date(),
                  fromCity: req.body.FromCity,
                  fromState: req.body.FromState,
                  sid: req.body.MessageSid,
                  _tabb: tabb._id
                })
                tabb.messages.push(new_message);
                //save both updated tabb and new message
                new_message.save(function(err){
                  tabb.save(function(err){
                    if(err){
                      console.log("error saving message and updated tabb");
                    }
                    else {
                      console.log("created new message");
                    }
                  })
                })
              })
            }
          })
        }
      })
    },
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
