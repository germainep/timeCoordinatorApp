/* TODO 
 - how many API routes do we need
 - what parts of the application do we not want to expose?

*/

var express = require('express');
var router = express.Router();
var meetings = require('../controllers/meetings');

// API routes
router.get('/', function(req, res, next) {
  console.log("access API route.");
});


router.route('/meetings/:meeting_id')
	.get(meetings.read)
	.put(meetings.update);

router.route('/users/:user_id')
	.get(function(req, res) {
		//respond with a User object
		var user = req.params.user_id;
		res.send("respond with a User object, "+user);
	})
	.put(function(req, res) {
		// modify a user
		var user = req.params.user_id;
		res.send("user "+user+" modified.");
	});

router.route('/meetings')
	.post(meetings.create)
	.get(function(req, res) {
		// return a list of meetings (filterable?)
		res.send("return a list of meetings.");
	})

module.exports = router;