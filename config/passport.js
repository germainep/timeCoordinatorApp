// config/passport.js

var LocalStrategy = require('passport-local');

var User = require('../models/user');

// exposing this function to the app
module.exports = function(passport) {
	// serialize and unserialize users out of a session (persistent login)
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	// LOCAL SIGNUP strategy ============
	// ==================================

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function (req, email, password, done) {
		process.nextTick(function() {
			// does this user already exist?
			User.findOne({ 'local.email' : email}, function (err, user) {
				if (err) 
					return done(err);
				// if it finds a user ...
				if (user) {
					return done(null, false, req.flash('signupMessage', 'That email is already registered here.'));
				} else {
					// if the user doesn't exist, create one.
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					//save the user to the database
					newUser.save(function(err) {
						if (err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));
};