/* 
Properly configure controller 
*/


'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Meeting = mongoose.model('Meeting'),
	_ = require('lodash');

/**
 * Create a meeting
 */
exports.create = function(req, res) {
	var meeting = new Article(req.body);
	meeting.user = req.user;

	meeting.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(meeting);
		}
	});
};

/**
 * Show the current meeting
 */
exports.read = function(req, res) {
	res.json(req.meeting);
};

// authentication to see meetings?
