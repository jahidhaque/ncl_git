/*
|----------------------------------------------
| setting productlanding directive
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.directive('productLanding', productLanding);

	function productLanding(){
		return {
			restrict: 'EA',
			templateUrl: "common/directives/productlanding/productlanding.template.html",
			controller: "productlandingCtrl",
			controllerAs: "prolnvm"
		};
	}
})();