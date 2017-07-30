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
	manageCtrl.$inject = ['authentication', '$location'];

	function manageCtrl(authentication, $location){

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
					console.log(mgvm.search);
				}
			}
		}
		else{
			$location.path('/login');
		}
	}
})();