var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	username: String,
	meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],
	local: {
		email: String,
		password: String
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	twitter: {
		id: String,
		token: String,
		displayName: String,
		userName: String
	},
	google: {
		id: String, 
		token: String,
		email: String,
		name: String
<<<<<<< HEAD
	}
	
=======
	},

	name: String,
	meetings: [String]

>>>>>>> added signup page persistent session storage fixed issue with not being able to update username added signin with twitter button removed login.html file due to not needing it
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);

