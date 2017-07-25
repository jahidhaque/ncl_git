/*
|----------------------------------------------
| setting up fileupload service.
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.service('productfile', productfile);

	productfile.$inject = ['$http'];

	function productfile($http){

		var 		uploadProductFile 		=		function(file){
			var fd = new FormData();
	        fd.append('product_pic', file);

	        return $http 
	        			.post('/api/fileupload', fd, {
	        				transformRequest: angular.identity,
            				headers: { 'Content-Type': undefined }
	        			})
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
			uploadProductFile: uploadProductFile
		}
	}
})();