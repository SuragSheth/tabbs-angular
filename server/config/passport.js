var passport          = require('passport');
var mongoose          = require('mongoose');
var Business          = mongoose.model('Business')
var LocalStrategy     = require('passport-local').Strategy;
var FacebookStrategy  = require('passport-facebook').Strategy;

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    Business.findById(id, function(err, user) {
        done(err, user);
    });
});

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

// User.findOne({ name: 'steven' }, function(err, user) {
//   console.log(err, user)
// });
passport.use('local-signup', new LocalStrategy({

    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) {

    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    console.log("passport:", email);
    console.log("passport:", req.body);
     console.log("passport:", password);
    Business.findOne({ 'local.email':  email }, function(err, business) {

      console.log("inside passport config:", business);
        // if there are any errors, return the error
        if (err)
          //res.json(err);
            return done(err);

        // check to see if theres already a user with that email
        if (business) {
            console.log("business exists")
            req.errors = {
                message: "business exists"
            }
            return done(null, false, req);
        } else {

            // if there is no user with that email
            // create the user
            var newBusiness            = new Business();

            // set the user's local credentials
            // newUser.name = email;
            // newUser.password = newUser.generateHash(password);
            newBusiness.local.email     = email;
            newBusiness.local.password  = newBusiness.generateHash(password);
            newBusiness.local.number    = req.body.number;
            newBusiness.local.name      = req.body.name;
            newBusiness.local.accounttype = req.body.value;
            // save the user
            newBusiness.save(function(err) {
                if (err)
                    throw err;
                return done(null, newBusiness);
            });
        }

    });

    });

}));


// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        // console.log("inside passport login", email);
        // console.log("inside passport login: req", req);
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Business.findOne({ 'local.email' :  email }, function(err, business) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!business)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!business.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            console.log("loging successful");
            return done(null, business);
            // return("hi")

            });
        }));

module.exports = passport;
