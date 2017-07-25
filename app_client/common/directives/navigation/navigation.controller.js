/*
|----------------------------------------------
| Setting up controller
|----------------------------------------------
*/
(function(){

	angular
		.module('nclhalal')
		.controller('navigationCtrl', navigationCtrl);

	// inject dependencies.
	navigationCtrl.$inject = ['$location', 'authentication'];

	function 	navigationCtrl	($location, authentication){
		var 	navvm 	=	this;
		// get the current path.
		navvm.currentPath 	=	$location.path();

		// checking user loggedin or not.
		navvm.isLoggedIn 		= authentication.isLoggedIn();

		// get the current user.
		navvm.currentUser 	= authentication.currentUser();

		// checking user status
		if(authentication.currentUser().status === "admin"){
			navvm.adminon 			=	true;
			navvm.customeron		=	false;
		}
		else if(authentication.currentUser().status === "customer"){
			navvm.adminon 			=	false;
			navvm.customeron 		=	true;
		}

		
		// loggin out user.
		navvm.logout = function(){
			authentication.logout();
			// redirect user to home page.
			$location.path('/bye');
		}
	}

})();