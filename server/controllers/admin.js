var mongoose = require("mongoose");

// add all of methods that interact with the 
module.exports = (function() {
  return {

  	// showemployees: function(req, res){
  	// 	Friend.find({}, function(err, friends){
  	// 		console.log("ALL FRIENDS", friends);
  	// 		res.json(friends);
  	// 	});
  	// },

    // editprofile

    add_employee: function(req, res) {
      // send the admin id and then send the employee info
    	Post.findOne({_id: req.params.id}, function(err, post){
        // data from form on the front end
        var employee = new Employee(req.body);
        //  set the reference like this:
        employee._post = post._id;
        post.employees.push(employee);
        // now save both to the DB
        employee.save(function(err){
            post.save(function(err){
        if(err) {
                   console.log('Error');
       } else {
              res.redirect('/');
              }
            });
        });
    });
  },

    
    delete_employee: function(req, res){
    	Employee.remove({_id: req.body._id}, function(err, Data){
    		if(err){
    			console.log(err);
    			console.log("ERROR: Could Not Remove Employee ")
    		} else {
    			res.redirect('/')
    		}
    	})
    },

    // editemployee: function(req, res){
    //   Friend.remove({_id: req.body._id}, function(err, Data){
    //     if(err){
    //       console.log(err);
    //       console.log("ERROR: Could Not Remove ")
    //     } else {
    //       res.redirect('/all_friends')
    //     }
    //   })
    // }




  }

})();