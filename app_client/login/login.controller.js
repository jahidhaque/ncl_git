/*
|----------------------------------------------------------------
| Setting up login controller.
|----------------------------------------------------------------
*/
(function(){

	angular
		.module('nclhalal')
		.controller('loginCtrl', loginCtrl);

	//inject location and authentication service to this controller.
	loginCtrl.$inject = ['$location', 'authentication'];

	function loginCtrl($location, authentication){
		var 	vm 	=	this;

		// create empty credentials.
		vm.credentials = {
			email: "",
			password: ""
		};

		// search for return page.
		vm.returnPage 	=	$location.search().page || '/';

		// login function.
		vm.onlogin = function(){
			vm.errors = "";
			if(!vm.credentials.email || !vm.credentials.password){
				vm.errors = {
					error: "All fields are required. Must not be empty"
				};
				return false;
			}
			else{
				vm.doLogin();
			}
		}


		// doLogin.
		vm.doLogin = function(){
			vm.errors = "";

			// calling the authentication service.
			authentication
				.login(vm.credentials)
				.error(function(err){
					vm.errors = err;
				})
				.then(function(){
					$location.search('page', null);

					// checking whether user coming from bye page.
					if(vm.returnPage === '/bye'){
						$location.path('/');
					}
					else{
						$location.path(vm.returnPage);
					}
				});
		};

		/*
		|----------------------------------------------------------------
		| don't allow logged in user to view login page.
		|----------------------------------------------------------------
		*/
		if(authentication.isLoggedIn()){
			$location.path(vm.returnPage);
		}

	}

})();