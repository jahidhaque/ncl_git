/*
|----------------------------------------------
| setting up single product controller
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('singleProductCtrl', singleProductCtrl);

	// add dependency.
	singleProductCtrl.$inject 		=		['systemservice', '$routeParams'];

	function singleProductCtrl(systemservice, $routeParams){

		var 		sngprovm		=		this;

		sngprovm.productname 			=		$routeParams.productname;

		// empty product object.
		sngprovm.product 			=		"";

		// calling systemservice method.
		systemservice
					.singleProduct(sngprovm.productname)
					.then(function(response){
						if(response.data.error 		===		true){
							sngprovm.error 			=		true;
							sngprovm.message 		=		response.data.message;
						}
						else if(response.data.success 		===		true){
							sngprovm.error 			=		false;
							sngprovm.success 		=		true;
							sngprovm.product 		=	response.data.product;
						}
					})
					.catch(function(err){
						console.log(err);
					})
	}
})();