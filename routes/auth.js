var express = require('express');
var router = express.Router();
var passport = require('passport');

/* Authentication Routes: First login */

// LOCAL strategy



// TWITTER strategy

router.route('/twitter')
	.get(passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter',{
	successReturnToOrRedirect: '/profile',
	failureRedirect: '/login'
}));

router.get('/facebook', passport.authenticate('facebook', {scope: 'email'}));	// scope:email just asks for the user's email address
router.get('/facebook/callback', passport.authenticate('facebook', {
	successReturnToOrRedirect: '/profile',
	failureRedirect: '/login'
}));

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile']}));
router.get('/google/callback', passport.authenticate('google', {
	successReturnToOrRedirect: '/profile',
	failureRedirect: '/login'
}));

/*Authorization, Already Logged In/ Connect to current account*/

//Facebook-----------------------

router.get('/connect/facebook', passport.authorize('facebook', {scope: 'email'}));

router.get('/connect/facebook/callback',
          passport.authorize('facebook', { 
            successRedirect: '/profile',
            failureRedirect: '/'
          }));



module.exports = router;
