/*
|----------------------------------------------
| setting up controller for system operation
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
var 			mongoose 			=	require('mongoose'),
				products 			=	mongoose.model('products'),
				shortid 			=	require('shortid'),
				multer 				=	require('multer');


// send json response
var 			sendJsonResponse	=	function(res, status, content){
	res.status(status);
	res.json(content);
}

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
        cb(null, './public/img/products/');
    },
    filename: function(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpg|JPG)$/)) {
            var err = new Error();
            err.code = 'filetype';
            return cb(err);
        } else {
        	var fileid 		=	shortid.generate();
        	cb(null, fileid+file.originalname);
        }
    }
});
var upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }
}).single('product_pic');


module.exports.uploadProductFile 	=	function(req, res){
	upload(req, res, function(err){
		if(err){
			if(err.code === 'LIMIT_FILE_SIZE'){
				sendJsonResponse(res, 404, {
					success: false,
					error: "File size is too large"
				});
			}
			else if(err.code === 'filetype'){
				sendJsonResponse(res, 404, {
					success: false,
					error : "Invalid file type"
				});
			}
			else {
				sendJsonResponse(res, 404, {
					success: false,
					error: "Enable to upload!"
				});
			}
		}
		else{
			if(!req.file){
				sendJsonResponse(res, 404, {
					success: false,
					error: "Please select a product image"
				});
			}
			else{
				sendJsonResponse(res, 200, {
					success: true,
					filename: req.file.filename
				});
			}
		}
	});
}


// show products.
module.exports.showProducts 		=	function(req, res){
	if(!req.params && !req.params.cat){
		sendJsonResponse(res, 404, {
			error: "Invalid request"
		});
	}
	else{
		// now find product according to given data.
		products
				.find({category: req.params.cat})
				.exec(function(err, products){
					if(!products){
						sendJsonResponse(res, 404, {
							error: true,
							message: "Sorry! No product found"
						});
						return false;
					}
					else if(err){
						sendJsonResponse(res, 404, {
							error: true,
							message: err
						});
						return false;
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
}

/*
|----------------------------------------------
| show sinlge product according to its id.
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
module.exports.showingleProduct 	=	function(req, res){
	if(!req.params && !req.params.productname){
		sendJsonResponse(res, 404, {
			error: "invalid request."
		});
		return false;
	}
	else{
		// now serach for product according to its id.
		products
				.findOne({name: req.params.productname})
				.exec(function(err, product){
					if(!product){
						sendJsonResponse(res, 404, {
							error: true,
							message: "Product not found"
						})
						return false;
					}
					else if(err){
						sendJsonResponse(res, 404, {
							error: true,
							message: "Network Error! Contact admin"
						});
						return false;
					}
					else{
						sendJsonResponse(res, 200, {
							success: true,
							product: product
						});
						return true;
					}
				})
	}
}


/*
|----------------------------------------------
| following function will make comment on given product.
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
module.exports.makeComment		=		function(req, res){
	if(!req.body.message || !req.body.product_id){
		sendJsonResponse(res, 404, {
			error: "Invalid form submission"
		});
	}
	else{
		// products model to access db
		products
				.findById({_id: req.body.product_id})
				.select('comments')
				.exec(function(err, product){
					if(!product){
						sendJsonResponse(res, 404, {
							error: "Product not found"
						});
						return false;
					}
					else if(err){
						sendJsonResponse(res, 404, {
							error: err
						});
						return false;
					}
					else{
						if(!req.body.user){
							req.body.user = "guest";
						}

						product.comments.push({
							commenter: req.body.user,
							comment: req.body.message
						});

						// now we need to save the comment.
						product.save(function(err){
							if(err){
								sendJsonResponse(res, 404, {
									error: "System Error! contact admin"
								});
								return false;
							}
							else{
								sendJsonResponse(res, 200, {
									comments: product.comments
								});
							}
						})
					}
				})
	}
}


module.exports.createProduct 		=	function(req, res){
	// create new product object.
	var 		product 			=	new products();

	product.name 			=		req.body.product_name;
	product.category 		=		req.body.category;
	product.subcat 			=		req.body.subcat;
	product.unit 			=		req.body.unit;
	product.inventoryunit 	= 		req.body.inventoryunit;
	product.price 			=		req.body.price;
	product.desc 			=		req.body.desc;
	product.image 			=		req.body.image;

	// now save the product.
	product.save(function(err){
		if(err){
			sendJsonResponse(res, 404, {
				error: true,
				message: err
			});
			return;
		}
		else{
			sendJsonResponse(res, 200, {
				success: true,
				message: product.name+"\thas been successfully added"
			});
		}
	})
}



/*
|----------------------------------------------
| This function will search the database product
| table and return the results.
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
module.exports.search 				=		function(req, res){
	if(!req.body && !req.body.criteria){
		sendJsonResponse(res, 404, {
			error: 'Invalid request'
		});
	}
	else{
		// // search the products collections.
		// products
		// 		.find({name: {$regex: req.body.criteria}})
		// 		.exec(function(err, product){
		// 			if(!product){
		// 				sendJsonResponse(res, 404, {
		// 					error: 'No result found'
		// 				});
		// 				return false;
		// 			}
		// 			else if(err){
		// 				sendJsonResponse(res, 404, {
		// 					error: err
		// 				});
		// 				return false;
		// 			}
		// 			else {
		// 				sendJsonResponse(res, 200, {
		// 					results: product
		// 				});
		// 			}
		// 		})
		console.log(req.body.criteria);
	}
}