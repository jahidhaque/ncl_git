/*
|----------------------------------------------
| setting up footer-Generic directive.
|----------------------------------------------
*/
(function(){

	angular
		.module('nclhalal')
		.directive('footerGeneric', footerGeneric);

	function 	footerGeneric(){
		return {
			restrict: 'EA',
			templateUrl: '/common/directives/footerGeneric/footerGeneric.template.html'
		};
	}
})();