'use strict';

var mongoose = require('mongoose');
var	User = require('../models/user');
var _ = require('lodash');

/**
 * Shows ONE User's information, and ONLY shows safe information 
 * 	(i.e. does not show passwords or sensitive data)
 */
exports.read = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.send(404)
		}
		if (!user) {
			res.status(404).send("This user does not exist.");
		} else {
			var o = {
				username: user.username,
				meetings: user.meetings
			};
			res.json(o);
		}
	});
};

// Can also use findByIdAndUpdate  ... 
exports.update = function(req, res) {
	// update the user object
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.sendStatus(404);
		}
		user = _.assign(user, req.body);

		user.save(function(err) {
			if (err) {
				return res.status(400);
			} else {
				var o = {
					username: user.username,
					meetings: user.meetings
				};
				res.json(o);
			}
		
			
		});
	});
	
};

