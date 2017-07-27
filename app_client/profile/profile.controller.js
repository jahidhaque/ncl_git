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
	profileCtrl.$inject = ['authentication'];

	function profileCtrl(authentication){

		var 	vm	=	this;

		console.log(authentication.currentUser());
	}
})();	