/*
|----------------------------------------------------------------
| setting up home controller.
|----------------------------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('registerCtrl', registerCtrl);

	// inject dependencies.
	registerCtrl.$inject = ['$location', 'authentication'];

	function registerCtrl($location, authentication){
		var 	vm 	=	this;

		// return user to the page they came from.
		vm.returnPage 	= $location.search().page || '/';

		// creating empty credentials.
		vm.credentials = {
			name: "",
			email: "",
			password: ""
		};

		vm.createAccount 	= 	function(){
			// checking form validation.
			vm.errors = "";

			if(!vm.credentials.name || !vm.credentials.email || !vm.credentials.password){
				vm.errors = {
					error: "All fields are required. Must not be empty"
				};
			}
			else{
				vm.doRegister();
			}
		};

		vm.doRegister 		=	function(){
			vm.errors = "";

			authentication
				.register(vm.credentials)
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
				})
		};

		/*
		|----------------------------------------------------------------
		| don't let logged in user visit registration page.
		|----------------------------------------------------------------
		*/
		if(authentication.isLoggedIn()){
			$location.path(vm.returnPage);
		}	
	}
	
})();