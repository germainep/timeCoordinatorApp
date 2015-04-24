var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var availabilitySchema = mongoose.Schema({
	username: { type: Schema.Types.ObjectId, ref: 'User' },
	start: Date,
	end: Date
});

availabilitySchema.methods.convertToLocalTZ = function(timeObj) {
	// returns the UTC times stored here into local ones.
	console.log("time passed from server :", timeObj);

	return new Date(timeObj);
} 


module.exports = mongoose.model('Availability', availabilitySchema);

