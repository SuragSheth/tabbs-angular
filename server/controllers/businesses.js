var mongoose = require("mongoose");

// add all of methods that interact with the
module.exports = (function() {
  return {

    last_added: function(req, res){
      Friend.find({}, function(err, friends){
        console.log("ALL FRIENDS", friends);
        res.json(friends);
      });
    },

    add: function(req, res) {
      console.log("YYEEEEAA", req.body);
      var friend = new Friend({name: req.body.first_name, age: req.body.age})
      console.log(friend);

      friend.save(function(err){
        if(err){
          console.log("ERROR: Friend Not Saved")
        } else {
          console.log(friend);
          console.log("SUCCESS: Friend Has Been Saved")
          res.redirect('/all_friends');
        }

      });
    },

    delete: function(req, res){
      Friend.remove({_id: req.body._id}, function(err, Data){
        if(err){
          console.log(err);
          console.log("ERROR: Could Not Remove ")
        } else {
          res.redirect('/all_friends')
        }
      })



    }




  }

})();
