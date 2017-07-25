/*
|----------------------------------------------
| setting up productlanding controller
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('productlandingCtrl', productlandingCtrl);

	// dependency.
	productlandingCtrl.$inject = ['systemservice', '$location'];

	function productlandingCtrl(systemservice, $location){

		var 		prolnvm		=	this;

		// empty product object.
		prolnvm.products 		=	"";

		prolnvm.path 		=	$location.path();
		
		// system service.
		systemservice
					.showProducts(prolnvm.path)
					.then(function(response){
						if(response.data.error === true){
							prolnvm.error 		=	true;
							prolnvm.errormessage = 	"Error! While looking for products"
						}
						else if(response.data.success === true){
							prolnvm.error 		=	false;
							prolnvm.productson 	=	true;
							prolnvm.products 	=	response.data.products;
						}
					})
					.catch(function(err){
						console.log(err);
					})
	}
})();