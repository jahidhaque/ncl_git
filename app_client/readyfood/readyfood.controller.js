/*
|----------------------------------------------------------------
| setting up home controller.
|----------------------------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('readyfoodCtrl', readyfoodCtrl);

	// inject dependencies.
	readyfoodCtrl.$inject = ['$http'];

	function readyfoodCtrl($http){
		console.log('ready food');
	}
})();