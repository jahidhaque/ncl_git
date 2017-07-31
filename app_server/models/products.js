/*
|----------------------------------------------
| setting up products model
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nclhalal, 2017
|----------------------------------------------
*/
var 			mongoose 			=		require('mongoose');


var 			comments 			=		new mongoose.Schema({
	commenter: {type: String},
	comment: {type: String},
	createdat: {type: Date, default: Date.now}
});


var 			productSchema 		=		new mongoose.Schema({
	name: {type: String, required: true},
	category: {type: String, required: true},
	subcat: {type: String, required: true},
	brand: {type: String, required: true},
	unit: {type: String, required: true},
	inventoryunit: {type: Number, required: true},
	createdat: {type: Date, default: Date.now, required: true},
	price: {type: Number, required: true},
	desc: {type: String, required: true},
	image: {type: String, required: true},
	comments: [comments]
});



var 			collectionName 		=		'products';


// registering model with mongoose.
mongoose.model('products', productSchema, collectionName);