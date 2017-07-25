/*
|----------------------------------------------
| setting up shoppingcart directive
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.directive('shoppingCart', shoppingCart);

	function shoppingCart(){
		return {
			restrict: 'EA',
			templateUrl: "common/directives/shoppingcart/shoppingcart.template.html",
			controller: "shoppingcartCtrl",
			controllerAs: 'cartvm'
		};
	}

})();