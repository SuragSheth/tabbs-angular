var mongoose = require("mongoose");
var Employee  = mongoose.model('Employee');
var Business  = mongoose.model('Business');

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
      console.log("YEEEEAAAABUDDYYYYY_________________", req.body);
      var employee_repack = {
          first_name: req.body.first,
          last_name: req.body.last,
          email: req.body.email,
          password: req.body.password
      }


    	Business.findOne({_id: req.body.admin}, function(err, business){
        // data from form on the front end
        var employee = new Employee(employee_repack);
        console.log("__________NEW EMPLOYEE", employee);
        console.log("_____________________BUSINESS ADDED TO", business)
        //  set the reference like this:
        employee._business = business._id;
        business.local.employees.push(employee);
        // now save both to the DB
        employee.save(function(err){
            business.save(function(err){
        if(err) {
                   console.log('Could not save the employee');
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