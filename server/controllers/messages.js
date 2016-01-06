var mongoose  = require('mongoose');
var Message   = mongoose.model('Message');
var Tabb      = mongoose.model('Tabb');
var Business  = mongoose.model('Business');

module.exports = (function(){
  return {
    outgoing_message: function(req, res, client){
      Tabb.findOne({_id: req.body.message.tabb_id}, function(err, tabb){
        if(tabb == null){
          res.json("can not message a user until they message you");
        }
        var new_message = new Message ({
          to: req.body.message.to,
          from: req.body.message.from,
          body: req.body.message.content,
          created_at: new Date(),
          fromCity: "",
          fromState: "",
          sid: "",
          _tabb: req.body.message.tabb_id
          })
        tabb.messages.push(new_message);
        new_message.save(function(err){
          tabb.save(function(err){
            if(err){
              console.log("unable to save outgoing message")
            }
            else{
              client.sendMessage({
                to: req.body.message.to,
                from: req.body.message.from,
                body: req.body.message.content
                },
                function(error, message) {
                  if (!error) {
                    console.log('Success! The SID for this SMS message is:', message);
                    console.log(message.sid);
                  } else {
                      console.log('Oops! There was an error.');
                  }
              });
              res.send("outgoing message saved");
            }
          })
        })
      })
    },
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
          Tabb.findOne({tabb_user_id: req.body.From, tabb_business_id: req.body.To}, function(err, tabb){
            if(tabb == null){ //tabb does not exist yet
              console.log("create tabb first time", tabb);
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
                    tabb.tabb_business_id = req.body.To;
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
                tabb.tabb_business_id = req.body.To;
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
    //find tabb by business number and populate messages
    get_business_messages: function(req, res){
      console.log("backend controller", req.params);
      // business_number = String(req.user.local.number);
      Tabb.find({tabb_business_id: req.params.id})
        .populate('messages')
        .exec(function(err, result){
        res.json(result);
      })
    }
  }
})();
