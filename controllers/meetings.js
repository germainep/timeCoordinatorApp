/*
Properly configure controller
*/
/*jshint node: true*/

'use strict';

/**
 * Module dependencies.
 */
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
	var meeting = new Meeting();
	meeting.name = (req.body.name);
    meeting.description= (req.body.description);
    meeting.date = (req.body.date);
    
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
			
			res.json(meeting);
		}
	});
};

/**
 * Shows ONE meeting
 */
exports.read = function(req, res) {
	Meeting.findById(req.params.meeting_id).populate('admin participants', 'name -_id').populate('availability').exec(function(err, meeting) {
		if (err) {
			return res.sendStatus(500);
		}
		if (!meeting) {
			return res.sendStatus(404).send("This meeting does not exist.");
		} else {
			res.json(meeting);
		}
	});
};
// Can also use findByIdAndUpdate  ...
exports.update = function(req, res) {
	// update the meeting object
	Meeting.findById(req.params.meeting_id, function(err, meeting) {
		if (err) {
			return res.send(500);
		}
          meeting.name = (req.body.name);
          meeting.description= (req.body.description);
          meeting.date = (req.body.date);
		  meeting.lastUpdated = Date.now();
		meeting.save(function(err) {
			if (err) {
				return res.status(500);
			} else {
				res.json(meeting);
			}
		});
	});

};

// this lists all meetings that the user is a part of
exports.list = function(req, res) {
  Meeting.find({participants: req.user._id}).populate('admin participants', 'name -_id').populate('availability').exec(function(err, meetings){
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
	// should also show which users are already invited

	// each user will get an email sent to them with an invitation
};

exports.showInvitePanel = function(req, res) {
	// TODO for email invite
}

	// the view needs to see which 
};
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
