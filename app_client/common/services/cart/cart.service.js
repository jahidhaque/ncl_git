/*
|----------------------------------------------
| setting up shopping cart service 
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: ncl, 2017
|----------------------------------------------
*/
(function(){
	angular	
		.module('nclhalal')
		.service('nclCart', nclCart);

	// dependency 
	nclCart.$inject = ['$http'];

	function nclCart($http){

		var 		addComment		=		function(comment){
			return $http
						.post('/api/makecomment', comment)
						.then(handleSuccess)
						.catch(handleError);
		}


		function handleSuccess(response){
			return response;
		}

		function handleError(response){
			return response;
		}

		return {
			addComment: addComment
		};
	}
})();