var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var availabilitySchema = mongoose.Schema({
	username: { type: Schema.Types.ObjectId, ref: 'User' },
	start: Date,
	end: Date
});

availabilitySchema.methods.convertToLocalTZ = function() {
	// returns the UTC times stored here into local ones.
} 


module.exports = mongoose.model('Availability', availabilitySchema);

