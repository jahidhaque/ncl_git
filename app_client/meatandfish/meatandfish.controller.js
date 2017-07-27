/*
|----------------------------------------------------------------
| Setting up controller.
|----------------------------------------------------------------
*/
/*
|----------------------------------------------------------------
| setting up home controller.
|----------------------------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('meatfishCtrl', meatfishCtrl);

	// inject dependencies.
	meatfishCtrl.$inject = ['$http'];

	function meatfishCtrl($http){
		console.log('meat controller');
	}
})();