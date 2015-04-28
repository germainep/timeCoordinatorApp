/*jshint node: true*/
'use strict';

var mongoose = require('mongoose');
var	User = require('../models/user');
var Meeting = require('../models/meeting');
var _ = require('lodash');

/**
 * Shows ONE User's information, and ONLY shows safe information
 * 	(i.e. does not show passwords or sensitive data)
 */
exports.read = function(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.user_id) === false) {
        return res.status(400).send("Invalid User Id.");
    }
	User.findById(req.params.user_id).exec(function(err, user) {
		if (err) {
			return res.status(500);
		}
		if (!user) {
			return res.status(404).send("This user does not exist.");
		} else {
      var sanitizedUser = {
        name: user.name,
        meetings: user.meetings,
        contacts: user.contacts
      };


			res.json(sanitizedUser);
		}
	});
};



/*exports.update = function(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.user_id) === false) {
        return res.status(400).send("Invalid User Id.");
    }
	// update the user object
	User.findById(req.params.user_id).exec(function(err, user) {
		if (err) {
			res.sendStatus(500);
		}
		console.log(req.body);
		user.name = req.body.name || user.name;
    user.contact.push(req.body.email);

		user.save(function(err) {
			if (err) {
				return res.status(500);
			} else {

        var sanitizedUser = {
          name: user.name,
          meetings: user.meetings,
          contact: user.contact
        };

				res.json(sanitizedUser);
			}
		});
	});
};*/

exports.editProfile = function(req, res) {
  User.findOne({_id: req.user}).exec(function(err, user) {
    
    user.set('name', req.body.name);
    user.contact.email.push(req.body.email);

    user.save(function(err) {
      if(err){
        res.session.error =err;
      } else {
        req.session.msg = 'User Updated.';
      }
      res.redirect('/profile/edit');
    });
  });
};

// Adds a user to a meeting.

exports.joinMeeting = function(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.user_id) === false) {
        return res.status(400).send("Invalid User Id.");
    }
	// find a meeting
	var meeting_id = req.params.meeting_id;
	
  Meeting.findById(meeting_id).exec(function(err, meeting) {
		if (err) {
			return res.sendStatus(500);
		}
		console.log(meeting);
		// add the user to that meeting participants array
		meeting.participants.push(req.user._id);
		meeting.save(function(err) {
			if (err) {
				return res.sendStatus(500);
			} else {
        return;
      }
			
		});
	});

	// add the meeting to the user's meetings array
	User.findById(req.user._id, function(err, user) {
		user.meetings.push(meeting_id);
		user.save(function(err) {
			if (err) {
				return res.sendStatus(500);
			}
			var name = req.user.name;
			res.json({message: name + " has successfully joined meeting "+ meeting_id});
		});
	});
};

