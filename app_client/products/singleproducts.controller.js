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
	singleProductCtrl.$inject 	=	['systemservice', '$routeParams', 'authentication', 'nclCart'];

	function singleProductCtrl(systemservice, $routeParams, authentication, nclCart){

		var 		sngprovm		=		this;


		// show product.
		sngprovm.showProduct 		=	function(){

			sngprovm.productname 		=		$routeParams.productname.replace(/-/g," ");
			
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
								
								// checking product has existing comments.
								if(sngprovm.product.comments.length > 0){
									sngprovm.hasComments = true;
								}
							}
						})
						.catch(function(err){
							console.log(err);
						})
		}
		/*
		|----------------------------------------------
		| make comment and show comment.
		| @author: jahid haque <jahid.haque@yahoo.com>
		| @copyright: nclhalal, 2017
		|----------------------------------------------
		*/
		// comment form off.
		sngprovm.commentForm 		=		false;

		sngprovm.addComment 		=		function(id){
			
			// comment object.
			sngprovm.comment 		=		{
				product_id: id,
				message: "",
				user: authentication.currentUser().name
			};

			// show the comment form.
			sngprovm.commentForm 	=		true;
			sngprovm.activeCat	=	"active-cat-list";

			sngprovm.makeComment	=		function(){
				if(!sngprovm.comment.message){
					sngprovm.commentError	=	true;
					sngprovm.commentError_message	=	"Please add comment!";
				}
				else{
					sngprovm.commentError	=	false;
					
					// calling method from service.
					nclCart
							.addComment(sngprovm.comment)
							.then(function(response){
								if(response.status 			=== 404){
									sngprovm.commentError		=	true;
									sngprovm.commentError_message	=	response.data.error;
								}
								else if(response.status 	=== 200){
									sngprovm.commentError		=	false;
									sngprovm.commentForm 		=	false;
									sngprovm.showComments 	=	true;
									sngprovm.productComments 	=	response.data.comments;

									// calling show product function.
									sngprovm.showProduct();
								}
							})
							.catch(function(err){
								alert(err);
							})
				}
			}
		}

		/*
		|----------------------------------------------
		| function to cancle comment 
		| @author: jahid haque <jahid.haque@yahoo.com>
		| @copyright: ncl, 2017
		|----------------------------------------------
		*/
		sngprovm.cancleComment	=		function(){
			sngprovm.commentForm 		=		false;
			// removing active state css class from the list.
			sngprovm.activeCat	=	"";
		}
	}
})();