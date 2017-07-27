/*
|----------------------------------------------------------------
| setting up home controller.
|----------------------------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('herbsCtrl', herbsCtrl);

	// inject dependencies.
	herbsCtrl.$inject = ['$http'];

	function herbsCtrl($http){
		console.log('veg controller');
	}
})();