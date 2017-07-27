/*
|----------------------------------------------------------------
| setting up home controller.
|----------------------------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('kitchenandhomeCtrl', kitchenandhomeCtrl);

	// inject dependencies.
	kitchenandhomeCtrl.$inject = ['$http'];

	function kitchenandhomeCtrl($http){
		console.log('kitchen and home');
	}
})();