/*
|----------------------------------------------------------------
| setting up home controller.
|----------------------------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('riceandflourCtrl', riceandflourCtrl);

	// inject dependencies.
	riceandflourCtrl.$inject = ['$http'];

	function riceandflourCtrl($http){
		console.log('rice and flour controller');
	}
})();