/*
|----------------------------------------------
| setting up shoppingcart controller
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.controller('shoppingcartCtrl', shoppingcartCtrl);

	// add dependency.
	shoppingcartCtrl.$inject = ['$window', 'nclCart', 'authentication'];

	function 	shoppingcartCtrl($window, nclCart, authentication){

		var 	cartvm 		=		this;

		// empty shopping cart array.
		cartvm.shoppingCart 	=	[];
		cartvm.quantity			=	1;

		cartvm.addtoCart		=		function(id, name, price, unit){

			// cart item
			cartvm.cartitems 	=		{
				cartid: id,
				name: name,
				price: price,
				unit: unit,
				quantity: cartvm.quantity++
			}

			if($window.localStorage['cart']){		
				
				var oldItems = localStorage.getItem('cart') || [];

				console.log(oldItems);

				// add cart to local storage.
				$window.localStorage.setItem("cart", oldItems);
			}
			
			else{				
				// add cart item to shoppingCart array.
				cartvm.shoppingCart.push(cartvm.cartitems);

				// add cart to local storage.
				$window.localStorage.setItem("cart", cartvm.cartitems);
			}	
			
		}

		/*
		|----------------------------------------------
		| make comment and show comment.
		| @author: jahid haque <jahid.haque@yahoo.com>
		| @copyright: nclhalal, 2017
		|----------------------------------------------
		*/
		// comment form off.
		cartvm.commentForm 		=		false;

		cartvm.addComment 		=		function(id){
			
			// comment object.
			cartvm.comment 		=		{
				product_id: id,
				message: "",
				user: authentication.currentUser().name
			};

			// show the comment form.
			cartvm.commentForm 	=		true;
			cartvm.activeCat	=	"active-cat-list";

			cartvm.makeComment	=		function(){
				if(!cartvm.comment.message){
					cartvm.commentError	=	true;
					cartvm.commentError_message	=	"Please add comment!";
				}
				else{
					cartvm.commentError	=	false;
					
					// calling method from service.
					nclCart
							.addComment(cartvm.comment)
							.then(function(response){
								if(response.status 			=== 404){
									cartvm.commentError		=	true;
									cartvm.commentError_message	=	response.data.error;
								}
								else if(response.status 	=== 200){
									cartvm.commentError		=	false;
									cartvm.commentForm 		=	false;
									cartvm.showComments 	=	true;
									cartvm.productComments 	=	response.data.comments;
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
		cartvm.cancleComment	=		function(){
			cartvm.commentForm 		=		false;
			// removing active state css class from the list.
			cartvm.activeCat	=	"";
		}
	}

})();