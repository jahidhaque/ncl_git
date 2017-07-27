/*
|----------------------------------------------------------------
| setting up home controller.
|----------------------------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('homeCtrl', homeCtrl);

	// inject dependencies.
	homeCtrl.$inject = ['generalQueries'];

	function homeCtrl(generalQueries){
		
		var 		hmvm		=	this;

		hmvm.loadProducts 		=	function(){
			// call method from the service.
			generalQueries
						.getAllProducts()
						.then(function(response){
							if(response.data.error === true){
								hmvm.errorOn 		=	true;
								hmvm.message 		=	response.data.message;
							}
							else if(response.data.success 	===	true){
								hmvm.errorOn 		=	false;
								hmvm.success 		=	true;
								hmvm.products 		=	shuffleProducts(response.data.products);
								hmvm.subproduct 	=	response.data.products[3];
								hmvm.subproducttwo 	=	response.data.products[9];

								hmvm.subproducttop 	=	response.data.products[10];

							}
						})
						.catch(function(err){
							console.log(err);
						})
		}

		// Function to shuffle the products array.
		var 		shuffleProducts 	=	function(products){
			var 	productLength 		=	products.length, t, i;

			// While there remain elements to shuffle
		  while (productLength) {
		    // Pick a remaining element…
		    i = Math.floor(Math.random() * productLength--);

		    // And swap it with the current element.
		    t = products[productLength];
		    products[productLength] = products[i];
		    products[i] = t;
		  }

		  return products;		
		}
	}
})();