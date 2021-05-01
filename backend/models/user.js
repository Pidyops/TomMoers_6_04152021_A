const mongoose = require('mongoose');
const uniqueValidator = (require('mongoose-unique-validator'));

const userSchema = mongoose.Schema({
	email: {
		type: String, 
		required: [true, 'Please add a email'], 
		unique: [true, 'Email already exist'],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
	},
	password: {
		type: String, 
		require: [true, 'Please add a passwrd'],
		minlength: [6, 'Password must be minimun 6 characters'] //
	}
});

userSchema.plugin(uniqueValidator); // activate the plugin

module.exports = mongoose.model('User', userSchema);

