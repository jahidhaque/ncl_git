/*
|----------------------------------------------
| setting up breakcrumb directive
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.directive('breadCrumb', breadCrumb);

	function breadCrumb(){
		return {
			restrict: 'EA',
			templateUrl: "common/directives/breadcrumb/breadcrumb.template.html",
			controller: 'breadcrumbCtrl',
			controllerAs: 'brdvm'
		};
	}
})();