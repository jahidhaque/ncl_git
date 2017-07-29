/*
|----------------------------------------------
| Setting up profile controller.
|----------------------------------------------
*/
(function(){

	angular
		.module('nclhalal')
		.controller('profileCtrl', profileCtrl);

	// inject dependencies.
	profileCtrl.$inject = ['authentication', '$location'];

	function profileCtrl(authentication, $location){

		var 	vm	=	this;

		// checking user logged in or not.
		if(authentication.isLoggedIn()){

		}
		else{
			$location.path('/login');
		}
	}
})();	