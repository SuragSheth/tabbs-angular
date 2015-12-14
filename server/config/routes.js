var admin = require('../controllers/admin.js');
var businesses = require('../controllers/businesses.js');


module.exports = function(app, passport) {

    // Start: routes for businesses =========================
        app.get('/dashboard', function(req, res){
            console.log("routes succesful add:", req.user)
            res.json(req.user);
        })
        app.post('/business/new', passport.authenticate('local-signup', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }))

        app.post('/business/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }))
    // End: routes for businesses =========================


	// app.get('/login_admin', function(req, res) {
	// 	friend.show(req, res);
 //    });

 //    app.post("/add_friend", function(req, res){
 //    	console.log("_________________", req.body);
 //    	friend.add(req, res);
 //    });

 //    app.post("/delete_friend", function(req, res){
 //    	friend.delete(req, res);
 //    });

}
