var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = ({
	name: String,
	meetings: [String]

});

module.exports = userSchema;

/*
TODO

 - meetings should be an array of Meetings objects

 - availability: how to represent availability for multiple users?


*/