/*
|----------------------------------------------
| setting up service for general queries
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.service('generalQueries', generalQueries);

	// add dependencies for this service.
	generalQueries.$inject 				=	['$http'];

	function generalQueries($http){

		var 		getAllProducts 		=	function(){
			return $http
						.get('/api/products')
						.then(handleSuccess)
						.catch(handleError);
		}

		function 		handleSuccess(response){
			return response;
		}

		function 		handleError(response){
			return response;
		}

		return {
			getAllProducts: getAllProducts
		};
	}
})();