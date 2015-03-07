/* TODO 
 - how many API routes do we need
 - what parts of the application do we not want to expose?

*/

var express = require('express');
var router = express.Router();

// API routes
router.get('/', function(req, res, next) {
  console.log("access API route.");
});


router.route('/meetings/:meeting_id')
	.get(function(req, res) {
		// respond with the meeting object
		var meeting = req.params.meeting_id;
		res.send("respond with the meeting object for "+meeting);
	})
	.put(function(req, res) {
		// modify an existing meeting
		var meeting = req.params.meeting_id;
		res.send("modify an existing meeting "+meeting);
	});

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
	.post(function(req, res) {
		// create a new meeting object
		res.send("create a new meeting object.");
	})
	.get(function(req, res) {
		// return a list of meetings (filterable?)
		res.send("return a list of meetings.");
	})

module.exports = router;