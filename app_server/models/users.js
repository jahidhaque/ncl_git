/*
|----------------------------------------------------------------
| Setting up user model.
|----------------------------------------------------------------
*/
var 			mongoose			=	require('mongoose')
				jwt 				=	require('jsonwebtoken'),
				crypto 				=	require('crypto');

var 			rewardsSchema 		=	new mongoose.Schema({
	rewards_on: {type: Boolean, required: true, default: true},
	platform_type: {type: String, required: true},
	created_at: {type: Date, default: Date.now}
})

var 			userSchema 		=	new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	hash: {type: String},
	salt: {type: String},
	status: {type: String},
	profile: {type: Array},
	history: {type: Array},
	rewards: [rewardsSchema]
});


/*
|----------------------------------------------------------------
| encrypt password.
|----------------------------------------------------------------
*/
userSchema.methods.setPassword	=	function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

/*
|----------------------------------------------------------------
| Setting up method to validate password.
|----------------------------------------------------------------
*/
userSchema.methods.validatePassword 	= function(password){
	var 	hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash === hash;
}

/*
|----------------------------------------------------------------
| setting up jsonwebtoken.
|----------------------------------------------------------------
*/
userSchema.methods.generateJwt 	=	function(){

	// setting expiry date.
	var 	expiry 	=	new Date();
		expiry.setDate(expiry.getDate() + 14);

	// return jsonwebtoken.
	// return jwt.
	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		status: this.status,
		exp: parseInt(expiry.getTime() / 1000 ),
	}, process.env.jswntokenkey);
}


var 			collectionName 	=	"users";


// registering shcema with mongoose.
mongoose.model('users', userSchema, collectionName);