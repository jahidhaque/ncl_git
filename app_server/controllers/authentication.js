/*
|----------------------------------------------------------------
| Requiring packages.
|----------------------------------------------------------------
*/
var 			mongoose 		=	require('mongoose'),
			validator 	=	require('validator'),
			passport 		=	require('passport'),
			users 		=	mongoose.model('users');


/*
|----------------------------------------------------------------
| function for returning json.
|----------------------------------------------------------------
*/
var 			sendJsonResponse	=	function(res, status, content){
	res.status(status);
	res.json(content);
}


/*
|----------------------------------------------------------------
| login controller.
|----------------------------------------------------------------
*/
module.exports.login 	=	function(req, res){
	// checking input.
	if(!req.body.email || !req.body.password)	{
		sendJsonResponse(res, 400, {
			message: "All fields required. Must not be empty"
		});
		return;
	}
	else{

		// using passport.
		passport.authenticate('local', function(err, user, info){

			if(err){
				sendJsonResponse(res, 404, err);
				return;
			}
			else{

				if(user){
					var token 	=	user.generateJwt();
					sendJsonResponse(res, 200, {
						token: token
					});
				}
				else{
					sendJsonResponse(res, 404, info);
				}
			}

		})(req, res);
	}
}

/*
|----------------------------------------------------------------
| setting up authentication controller for register
|----------------------------------------------------------------
*/
module.exports.register		=	function(req, res){
	// checking some validation.
	if(!req.body.name || !req.body.email || !req.body.password){
		sendJsonResponse(res, 400, {
			error: "All fields required. must not be empty"
		});
	}
	else{
		// validating given input values.
		if(!validator.isEmail(req.body.email, {allow_display_name: true})){
			sendJsonResponse(res, 400, {
				error: "Invalid email address. Please enter again."
			});
			return false;
		}
		if(!validator.isAlpha(req.body.name)){
			sendJsonResponse(res, 400, {
				error: "Invalid name, your name can't contain number or symbol"
			});
			return false;
		}
		if(!validator.isLength(req.body.password, {min: 5, max: 12})){
			sendJsonResponse(res, 400, {
				error: "Your password should be between 5 to 12 characters"
			});
			return false;
		}
		else{
			// creating empty user and filling it with data.
			var 		user 		=	new users();
			user.name = req.body.name;
			user.email = req.body.email;
			user.password = user.setPassword(req.body.password);
			user.status   =	"customer",
			user.profile = [];
			user.history = [];
			user.rewards = [];

			// save user into the database.
			user.save(function(err){
				if(err){
					if(err.code == '11000'){
						sendJsonResponse(res, 400, {
							error: "This email address has been taken."
						});
					}
					else{
						sendJsonResponse(res, 400, {
							error: "System Error! Please contact admin"
						});	
					}
					return false;
				}
				else{
					var 	token	=	user.generateJwt();
					sendJsonResponse(res, 200, {
						token: token
					});
				}
			})
		}
	}
}


/*
|----------------------------------------------
| function for get rewards	
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
module.exports.getRewards	=	function(req, res){
	if(!req.params && !req.params.user){
		sendJsonResponse(res, 404, {
			error: "Invaid request. Not found"
		});
	}
	else{
		users
			.findOne({email: req.params.user})
			.exec(function(err, user){
				if(!user){
					sendJsonResponse(res, 404, {
						error: "No user found with this email"
					});
					return false;
				}
				else if(err){
					sendJsonResponse(res, 404, {
						error: "Network Error! Contact admin"
					});
					return false;
				}
				if(user.rewards && user.rewards.length > 0){
					sendJsonResponse(res, 200, {
						rewards: user.rewards
					});
				}
				else{
					sendJsonResponse(res, 204, null);
				}
			})
	}
}



// setting up rewards plan for given user.
module.exports.setRewards	=		function(req, res){
	if(!req.body.user){
		sendJsonResponse(res, 404, {
			error: "Invalid request"
		});
	}
	else{

		// now let's find user with given user info.
		users
			.findOne({email: req.body.user})
			.select('rewards')
			.exec(function(err, user){
				if(!user){
					sendJsonResponse(res, 404, {
						error: "No user found with given details"
					});
					return false;
				}
				else if(err){
					sendJsonResponse(res, 404, {
						error: "Error! contact admin"
					});
					return false;
				}
				else{
					
					user.rewards.push({
							rewards_on: true,	
							platform_type: "Gold"
					});

					// now save this user with this rewards info.
					user.save(function(err){
						if(err){
							sendJsonResponse(res, 404, {
								error: "Error! while saving rewards plan. Contact admin"
							});
							return false;
						}
						else{
							sendJsonResponse(res, 200, {
								success: true
							})
						}
					})

				}
			})
	}
}