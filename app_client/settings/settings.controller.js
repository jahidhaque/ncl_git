/*
|----------------------------------------------
| setting up controller for settings
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: ncl-halal, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('systemCtrl', systemCtrl);

	systemCtrl.$inject = ['systemservice', '$scope', 'productfile', 'authentication', '$location'];

	function 	systemCtrl(systemservice, $scope, productfile, authentication, $location){
		var 	sysvm		=	this;


		// check whether user logged in or not.
		if(authentication.isLoggedIn()){

			const 	currentUser 	=	authentication.currentUser();

			if(currentUser.status === 'customer'){
				$location.path('/profile');
			}
			else if(currentUser.status 	=== 'admin'){

				sysvm.active					=	"active";
				
				sysvm.products 		=	{
					product_name: "",
					category: "",
					subcat: "",
					unit: "",
					inventoryunit: "",
					price:"",
					desc: "",
					image: ""
				};	
			
				sysvm.saveProduct		=	function(){
					
					sysvm.products.image 	=	$scope.product_img;

					if(!sysvm.products.product_name || !sysvm.products.category || !sysvm.products.subcat
						|| !sysvm.products.unit || !sysvm.products.inventoryunit || !sysvm.products.price
						|| !sysvm.products.desc){
						sysvm.error 	=	true;
						sysvm.message 	=	"All fields are required. Must not be empty";
					}
					else{
						productfile
						.uploadProductFile(sysvm.products.image)
						.then(function(response){
							if(response.data.success === false){
								sysvm.error 		=	true;
								sysvm.message 		=	response.data.error;
							}
							else if(response.data.success 	===		true){
								//update file name in sysvm.products.
								sysvm.products.image = response.data.filename;

								// calling system service method.
								systemservice
											.createProduct(sysvm.products)
											.then(function(response){
												if(response.data.success === true){
													sysvm.successon 	= 	true;
													sysvm.error 		= 	false;
													sysvm.message 		= response.data.message;
												}
												else if(response.data.error === true){
													sysvm.error = true;
													sysvm.message = response.data.message;
												}
											})
											.catch(function(err){
												console.log(err);
											})

							}
						})
						.catch(function(err){
							console.log(err);
						})
					}
				}
			}
		}
		else{
			// redirect user to login page.
			$location.path('/login');
		}

	}
})();