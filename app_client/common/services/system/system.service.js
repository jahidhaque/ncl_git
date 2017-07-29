/*
|----------------------------------------------
| setting up service for system
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: ncl, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.service('systemservice', systemservice);

	//dependency 
	systemservice.$inject = ['$http'];

	function systemservice($http){

		var				createProduct 		=		function(data){
			return $http
					.post('/api/createproduct', data)
					.then(handleSuccess)
					.catch(handleError);
		};

		var 			showProducts		=		function(cat){
			return $http
						.get('/api/showproducts'+cat)
						.then(handleSuccess)
						.catch(handleError);
		}

		var 			singleProduct 		=		function(productname){
			return $http	
						.get('/api/singleproduct/'+productname)
						.then(handleSuccess)
						.catch(handleError);
		}


		// search product
		var 			searchProducts 		=		function(criteria){
			return 	$http
						.get('/api/generalsearch/'+criteria)
						.then(handleSuccess)
						.catch(handleError);
		}

		function 	handleSuccess(response){
			return response;
		}

		function 	handleError(response){
			return response;
		}

		return {
			createProduct: createProduct,
			showProducts: showProducts,
			singleProduct: singleProduct,
			searchProducts: searchProducts
		};
	}
})();