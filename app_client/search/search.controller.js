/*
|----------------------------------------------
| Search controller
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: newcastle halal, 2017
|----------------------------------------------
*/
'use strict';

(function () {
	angular
		.module('nclhalal')
		.controller('searchCtrl', searchCtrl);

	searchCtrl.$inject = ['$routeParams', 'systemservice'];

	function searchCtrl($routeParams, systemservice) {
		const srcvm = this;

		srcvm.search = function () {
			systemservice
				.searchProducts($routeParams.q)
				.then(function(response) {
					if (response.data.results.length < 1) {
						srcvm.noresult = true;
					}
					else if (response.data.results.length > 0 ) {
						srcvm.noresult = false;
						srcvm.results = true;
						srcvm.searchResults = response.data.results;
					}
				})
				.catch(function(err) {
					alert(err);
				})
		}
	}
})();
