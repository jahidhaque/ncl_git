/*
|----------------------------------------------
| setting up controller for general queries.
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
var 		mongoose 				=		require('mongoose'),
			products 				=		mongoose.model('products');

// function to send json response.
var 		sendJsonResponse		=		function(res, status, content){
	res.status(status);
	res.json(content);
}


// show all product method.
module.exports.showProducts			=		function(req, res){
	products
			.find({}, function(err, products){
				if(err){
					sendJsonResponse(res, 404, {
						error: true,
						message: "Something went wrong. Contact admin"
					});
					return false;
				}
				else if(!products){
					sendJsonResponse(res, 404, {
						error: true,
						message: "No Products Found!"
					});
					return;
				}
				else{
					sendJsonResponse(res, 200, {
						success: true,
						products: products
					});
					return true;
				}
			})
}