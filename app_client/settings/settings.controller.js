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

	systemCtrl.$inject = ['systemservice', '$scope', 'productfile'];

	function 	systemCtrl(systemservice, $scope, productfile){
		var 	sysvm		=	this;

		sysvm.active		=	"active";
		sysvm.activeSettingsProduct 	=	"active-settings-btn";
		sysvm.activeManageProduct 		=	" ";
		sysvm.addNewProduct 			=	true;
		sysvm.manageProductOpr			=	false;

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


		// add new product.
		sysvm.newProduct 			=	function(){
			// turn back add product form.
			sysvm.addNewProduct 	=	true;
			// turn off manage product area.
			sysvm.manageProductOpr	=	false;

			// remove active css class.
			sysvm.activeSettingsProduct 	=	' active-settings-btn';
			// add new active btn.
			sysvm.activeManageProduct 		=	" ";
		}
		
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


		// manage products.
		sysvm.manageProduct 	=	function(){

			// remove active css class.
			sysvm.activeSettingsProduct 	=	' ';
			// add new active btn.
			sysvm.activeManageProduct 		=	"active-settings-btn";

			// hide the product add section.
			sysvm.addNewProduct 			=	false;

			sysvm.manageProductOpr			=	true;


			// search object. 
			sysvm.search 					=	{
				criteria: ""
			};

			// search function.
			sysvm.doSearch		=	function(){
				if(!sysvm.search.criteria){
					sysvm.searchError 	=	true;
					sysvm.searchErrorMessage = "Please search by name, type or product id";
				}
				else{
					systemservice
								.searchProducts(sysvm.search)
								.then(function(response){
									// turn results container on.
									// sysvm.hasSearchResult 		=	 true;
									console.log(response.data);
									// if(parseInt(response.data.results.length) > 0){
									// 	sysvm.searchedProducts 	=	response.data.results;
									// }
									// else{
									// 	sysvm.noProductFound 	=	true;
									// 	sysvm.searchFeedback 	=	
									// 	"No results has been found. Please check product name again";
									// 	sysvm.searchedProducts.length = 0;
									// }
								})
								.catch(function(err){
									alert(err);
								})
				}
			}
		}
	}
})();