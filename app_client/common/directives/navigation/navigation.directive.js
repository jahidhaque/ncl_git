/*
|----------------------------------------------------------------
| setting up navigation directive.
|----------------------------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.directive('navigation', navigation);
	function navigation(){
		return{
			restrict: 'EA',
			templateUrl: '/common/directives/navigation/navigation.template.html',
			controller: 'navigationCtrl as navvm'
		};
	}
})();