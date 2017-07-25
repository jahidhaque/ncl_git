/*
|----------------------------------------------
| setting up breadcrumb controller
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('breadcrumbCtrl', breadcrumbCtrl);

	// inject dependency
	breadcrumbCtrl.$inject = ['authentication', '$location', '$timeout'];

	function breadcrumbCtrl(authentication, $location, $timeout){
		var 	brdvm 				=		this;

		// set reward on by default.
		brdvm.customerPromo			=		true;

		brdvm.path 					=		$location.path();

		if(brdvm.path 	===	"/"){
			brdvm.shownextcrumb	=	false;
			brdvm.noBorder 		=	'no-border';
		}
		else{
			brdvm.shownextcrumb	=	true;
		}

		console.log(brdvm.path);

		// check if user already logged in or not.
		if(authentication.isLoggedIn() !== false){
			brdvm.currentUser 		=	authentication.currentUser();

			// check user status
			if(brdvm.currentUser.status === 'customer'){
				// calling methods for rewards from authentication.
				authentication
							.rewards(brdvm.currentUser.email)
							.then(function(response){
								if(parseInt(response.status) === 204){
									brdvm.promoteRewards 	=	true;

									brdvm.user 			= {
										user: brdvm.currentUser.email
									};

									// calling method to set up new rewards plan.
									brdvm.setRewards 		=	function(){
										// set rewards program for given user.																				
										authentication
													.setCustomerRewards(brdvm.user)
													.then(function(response){
														if(response.data.success 	===		true){
															brdvm.promoteRewards	=	false;
															brdvm.rewardSetted 		=	true;
															brdvm.successFlash 		=	true;

															// hide success flash element in 3 seconds
															$timeout(function() {
																brdvm.successFlash	=	false;
															}, 3000);
														}
													})
													.catch(function(err){
														alert(err);
													})										
									}
									
								}
								else if(response.data.rewards[0].rewards_on === true){
									brdvm.hasRewards	=	true;
								}
							})
							.catch(function(error){
								alert(error);
							})
			}
			else if(brdvm.currentUser.status 	===	'admin'){
				brdvm.customerPromo 			=	false;
			}
		}
		else{
			brdvm.generalRewardPromo 			=	true;	
		}


		

	}
})();