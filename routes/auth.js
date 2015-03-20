var express = require('express');
var router = express.Router();
var passport = require('passport');

/* Authentication Routes */

// LOCAL strategy



// TWITTER strategy

router.route('/auth/twitter')
	.get(passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter',{
	successReturnToOrRedirect: '/profile',
	//successRedirect: '/profile',
	failureRedirect: '/login'
}));





module.exports = router;
