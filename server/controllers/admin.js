var mongoose = require("mongoose");
var Employee  = mongoose.model('Employee');
var Business  = mongoose.model('Business');
var Tabbs = mongoose.model("Tabb")

// add all of methods that interact with the 
module.exports = (function() {
  return {

    get_all_employees: function(req, res){
      Employee.find({_business: req.params.id}, function(err, employees){
        console.log(employees);
        res.json(employees);
      });
    },

    get_all_contacts: function(req, res){
      Tabbs.find({tabb_business_id: req.params.number}, function(err, employees){
        console.log(employees);
        res.json(employees);
      });
    },


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
      console.log("12312312312312#", req.body);
    	Employee.remove({_id: req.body.employee_id}, function(err, Data){
    		if(err){
    			console.log(err);
    			console.log("ERROR: Could Not Remove Employee ")
    		} else {
          console.log("employee has been deleted");
          res.redirect('/');
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