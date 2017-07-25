/*
|----------------------------------------------------------------
| setting up home controller.
|----------------------------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('vegetableandfruitsCtrl', vegetableandfruitsCtrl);

	// inject dependencies.
	vegetableandfruitsCtrl.$inject = ['$http'];

	function vegetableandfruitsCtrl($http){
		console.log('veg controller');
	}
})();