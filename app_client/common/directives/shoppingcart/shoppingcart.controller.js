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

		
	}

})();