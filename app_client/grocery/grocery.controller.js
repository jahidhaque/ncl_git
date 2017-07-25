/*
|----------------------------------------------------------------
| setting up home controller.
|----------------------------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('groceryCtrl', groceryCtrl);

	// inject dependencies.
	groceryCtrl.$inject = ['$http'];

	function groceryCtrl($http){
		console.log('grocery controller');
	}
})();