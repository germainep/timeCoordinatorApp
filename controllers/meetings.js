'use strict';

var mongoose = require('mongoose');
var	Meeting = require('../models/meeting');
var User = require('../models/user');
var _ = require('lodash');
var moment = require('moment-timezone');


/**
 * Create a meeting
 	This will also save the admin field to match the user who created the meeting.
 */
exports.create = function(req, res) {
	var meeting = new Meeting({});
	meeting = _.assign(meeting, req.body);

	// save the creator as the admin
	meeting.admin.push(req.user._id);
	meeting.lastUpdated = Date.now();

	// also save the creator as a participant of the meeting
	meeting.participants.push(req.user._id);
	meeting.availability = [];

	// and save this meeting id to the user's meetings array
	User.findById(req.user._id, function(err, user) {
		if (!user) {
			return res.status(404);
		} else {
		user.meetings.push(meeting._id);
		user.save(function(err) {
			if (err) {
				return res.status(500);
			} else {
				console.log("User updated.");
				return res.status(200);
			}
		});
		}
	});
	// now save this meeting itself to the database.
	meeting.save(function(err) {
		if (err) {
			return res.status(500);
		} else {
			var o = {
				id: meeting._id,
				name: meeting.name,
				admin: meeting.admin,
				participants: meeting.participants,
				description: meeting.description,
				date: meeting.date
			};
			console.log("Meeting saved.");
			res.status(200).json(o);
		}
	});
};

/**
 * Shows ONE meeting
 */
exports.read = function(req, res) {
	Meeting.findById(req.params.meeting_id).populate('admin participants', 'username -_id').populate('availability', 'username').exec(function(err, meeting) {
		if (err) {
			return res.sendStatus(500);
		}
		if (!meeting) {
			return res.sendStatus(404);
		} else {
		// returns availability as UTC time
			var o = {
				name: meeting.name,
				admin: meeting.admin,
				description: meeting.description,
				date: meeting.date,
				participants: meeting.participants,
				lastUpdated: meeting.lastUpdated,
				availability: meeting.availability 
			};
			res.status(200).json(o);
		}
	});
};


exports.update = function(req, res) {
	// update the meeting object
	Meeting.findById(req.params.meeting_id, function(err, meeting) {
		if (err) {
			return res.send(500);
		}
		meeting = _.assign(meeting, req.body);
		meeting.lastUpdated = Date.now();
		meeting.save(function(err) {
			if (err) {
				return res.status(500);
			} else {
				var o = {
					name: meeting.name,
					id: meeting._id,
					description: meeting.description,
					participants: meeting.participants,
					lastUpdated: meeting.lastUpdated
				};
				return res.status(200).json(o);
			}
		});
	});

};

// this lists all meetings that the user is a part of
exports.list = function(req, res) {
	Meeting.find({participants: req.user._id}, function(err, meetings) {
		if (err) {
			return res.send(500);
		} 
		if (!meetings) {
			return res.send(404);
		}
		return res.status(200).json(meetings);
	})
};

exports.inviteUsers = function(req, res) {
	// the view will allow the user to select which meeting and which users to invite
	// TODO for email invite
}

exports.showInvitePanel = function(req, res) {
	// TODO for email invite
}

exports.destroy = function(req, res) {
	Meeting.findById(req.params.meeting_id, function(err, meeting) {
		meeting.remove(function(err) {
			if (err) {
				return res.sendStatus(500);
			}
			res.status(200).send("Meeting with id: "+meeting._id+" is removed.");
		});
	});
};
