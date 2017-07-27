/*
|----------------------------------------------------------------
| setting up home controller.
|----------------------------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('aboutusCtrl', aboutusCtrl);

	// inject dependencies.
	aboutusCtrl.$inject = ['$http'];

	function aboutusCtrl($http){		
		var 	aboutvm		=	this;

		aboutvm.message 	=	{
			sender: "",
			contact: "",
			query:""
		};

		aboutvm.sendMessage =	function(){
			if(!aboutvm.message.sender || !aboutvm.message.contact || !aboutvm.message.query){
				aboutvm.form_error = true;
				aboutvm.form_error_message = "All * fields are required. Must not be empty";
			}
			else{
				
			}
		}
	}
})();