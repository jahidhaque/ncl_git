/*
|----------------------------------------------------------------
| Setting up back-end api routes.
|----------------------------------------------------------------
*/
var 		express 		=		require('express'),
			routes 			=		express.Router();


// authentication controller.
var 		authentication	=		require('../controllers/authentication'),
			generalOpr		=		require("../controllers/general"),
			systemOperation =		require('../controllers/system');

// setting up routes.
routes.post('/register', authentication.register);
routes.post('/login', authentication.login);

// setting routes for general queries.
routes.get('/products', generalOpr.showProducts);

// setting up routes for rewards
routes.get('/rewards/:user', authentication.getRewards);
routes.post('/setrewards', authentication.setRewards);

// setting up routes for system operation.
routes.post('/fileupload', systemOperation.uploadProductFile);
routes.get('/showproducts/:cat', systemOperation.showProducts);
// show single product.
routes.get('/singleproduct/:productname', systemOperation.showingleProduct);
// make comment on product.
routes.post('/makecomment', systemOperation.makeComment);
routes.post('/createproduct', systemOperation.createProduct);
routes.get('/generalsearch/:criteria', systemOperation.generalSearch);

/*
|----------------------------------------------------------------
| exporting routes
|----------------------------------------------------------------
*/
module.exports = routes;