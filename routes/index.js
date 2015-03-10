var express = require('express');
var router = express.Router();
// import index controller
var index = require('../controllers/index.js');

// Routes for index 

router.route('/')
	.get(function (req, res, next) {
		res.render('index.jade', {title: 'Express' });
	});

router.route('/login')
	.get(function (req, res, next) {
		res.render('login.jade', {title: 'Login'});
	})
	.post(index.login);

router.route('/signup')
	.get(function (req, res) {
		res.render('signup.jade', {message: req.flash('signupMessage')});
	})
	.post();

router.route('/profile')
	.get(isLoggedIn, function (req, res) {
		res.render('profile.jade', {
			// passes the user to the template from the user session
			user: req.user
		});
	});

router.route('/logout')
	.get(function (req, res) {
		req.logout();
		res.redirect('/');
	});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;
