/* 
Properly configure controller 
*/


'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var	Meeting = require('../models/meeting');
var User = require('../models/user');
var _ = require('lodash');

/**
 * Create a meeting
 	This will also save the admin field to match the user who created the meeting.
 */
exports.create = function(req, res) {
	var meeting = new Meeting({});
	meeting = _.assign(meeting, req.body);
	meeting.admin.push(req.user._id);
	meeting.lastUpdated = Date.now();
	meeting.save(function(err) {
		if (err) {
			return res.status(400);
		} else {
			var o = {
				id: meeting._id,
				name: meeting.name,
				admin: meeting.admin,
				participants: meeting.participants,
				description: meeting.description,
				date: meeting.date
			};
			res.json(o);
		}
	});
};

/**
 * Shows ONE meeting
 */
exports.read = function(req, res) {
	Meeting.findById(req.params.meeting_id).populate('admin participants', 'username -_id').populate('availability', 'username').exec(function(err, meeting) {
		if (err) {
			res.send(404);
		}
		if (!meeting) {
			res.status(404).send("This meeting does not exist.");
		} else {
			var o = {
				name: meeting.name,
				admin: meeting.admin,
				description: meeting.description,
				date: meeting.date,
				participants: meeting.participants,
				lastUpdated: meeting.lastUpdated,
				availability: meeting.avail
			};
			res.json(o);
		}
	});
};

// Can also use findByIdAndUpdate  ... 
exports.update = function(req, res) {
	// update the meeting object
	Meeting.findById(req.params.meeting_id, function(err, meeting) {
		if (err) {
			res.send(404);
		}
		meeting = _.assign(meeting, req.body);
		meeting.lastUpdated = Date.now();
		meeting.save(function(err) {
			if (err) {
				return res.status(400);
			} else {
				var o = {
					name: meeting.name,
					id: meeting._id,
					description: meeting.description,
					participants: meeting.participants,
					lastUpdated: meeting.lastUpdated
				};
				res.json(o);
			}
			
			
		});
	});
	
};
// this lists all meetings - should have some sort of filtering available.
exports.list = function(req, res) {
	Meeting.find(function(err, meetings) {
		if (err) {
			res.send(404);
		}
		res.json(meetings);
	})
};

exports.inviteUsers = function(req, res) {
	// the view will allow the user to select which meeting and which users to invite
	// should also show which users are already invited

	// each user will get an email sent to them with an invitation
}

exports.showInvitePanel = function(req, res) {
	// the view needs to see which 
}

exports.destroy = function(req, res) {
	Meeting.findById(req.params.meeting_id, function(err, meeting) {
		meeting.remove(function(err) {
			if (err) {
				res.send(500);
			}
			res.send("Meeting with id: "+meeting._id+" is removed.");
		});
	});
}

// authentication to see meetings?
