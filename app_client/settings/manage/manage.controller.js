/*
|----------------------------------------------
| controller for manage
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: ncl, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('manageCtrl', manageCtrl);
	// adding dependency.
	manageCtrl.$inject = ['authentication', '$location', 'systemservice'];

	function manageCtrl(authentication, $location, systemservice){

		const	mgvm		=		this;

		if(authentication.isLoggedIn()){
			const 	currentUser 	=	authentication.currentUser();
			if(currentUser.status 	=== 'customer'){
				$location.path('/profile');
			}
			else if(currentUser.status === 'admin'){
				mgvm.hasSearchResult 	=	false;

				// search object. 
				mgvm.search 			=	{
					name: ''
				};

				// shen search button clicked.
				mgvm.searchProduct 		=	function(){					
					if(!mgvm.search.name){
						mgvm.searchFormError = true;
						mgvm.emptySearch = "Please enter product name to search";
					}
					else{
						mgvm.searchFormError = false;

						// now call the system service function to search the db.
						systemservice
							.searchProducts(mgvm.search.name)
							.then(function(response){
								if(response.status === 200){
									mgvm.hasSearchResult =	true;
									// checking no of records.
									if(response.data.results.length > 0){
										mgvm.weHaveResults 	=	true;
										mgvm.noResults 		=	false;
										mgvm.searchResults 	=	response.data.results;
									}
									else{
										mgvm.noResults 		=	true;
										mgvm.weHaveResults 	=	false;
									}
								}
								else if(response.status === 404){
									mgvm.systemError 	=	true;
								}

							})
							.catch(function(err){
								alert(err);
							})
					}	
				}

				// delete function.
				mgvm.deleteProduct 			=		function(product_id){
					// calling method from system service and passing the id.
					systemservice
						.deleteProduct(product_id)
						.then(function(response){
							if(response.data.error){
								mgvm.deleteSuccess = false;
								mgvm.deleteError = true;
								mgvm.deleteErrorMessage = response.data.error;
							}
							else if(response.data.success){
								mgvm.deleteError = false;
								mgvm.deleteSuccess = true;
								mgvm.deleteSuccessMessage = response.data.success;
							}
						})
						.catch(function(err){
							alert(err);
						})
				}
			}
		}
		else{
			$location.path('/login');
		}
	}
})();
