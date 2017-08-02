require('dotenv').load();
/*
|----------------------------------------------------------------
| Setting up project.
|----------------------------------------------------------------
*/
var 		express 		=		require('express'),
			path 			=		require('path'),
			morgan 			=		require('morgan'),
			fs 				=		require('fs'),
			passport 		=		require('passport'),
			uglifyjs 		=		require('uglify-js'),
			bodyParser 		=		require('body-parser');


// connecting with the database.
require('./app_server/models/db');

// passport-config.
require('./app_server/config/passport');

/*
|----------------------------------------------------------------
| express object.
|----------------------------------------------------------------
*/
var 		app 			=		express();

/*
|----------------------------------------------------------------
| General settings.
|----------------------------------------------------------------
*/
// setting up form submission.
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// loggin.
app.use(morgan('dev'));

/*
|----------------------------------------------------------------
| Setting up static files server.
|----------------------------------------------------------------
*/
app.use(express.static(__dirname + path.join('/public')));
app.use(express.static(__dirname + path.join('/app_client')));

/*
|----------------------------------------------------------------
| minifing angular js
|----------------------------------------------------------------
*/
var 		client_files 	= [
"app_client/app.js",
"app_client/common/services/authentication/authentication.service.js",
"app_client/common/filter/pretty-url.filter.js",
"app_client/common/services/system/system.service.js",
"app_client/common/services/cart/cart.service.js",
"app_client/common/services/generalqueries/generalqueries.service.js",
"app_client/common/services/fileupload/fileupload.service.js",
"app_client/common/directives/navigation/navigation.directive.js",
"app_client/common/directives/breadcrumb/breadcrumb.directive.js",
"app_client/common/directives/breadcrumb/breadcrumb.controller.js",
"app_client/common/directives/productlanding/productlanding.directive.js",
"app_client/common/directives/productlanding/productlanding.controller.js",
"app_client/common/directives/shoppingcart/shoppingcart.directive.js",
"app_client/common/directives/shoppingcart/shoppingcart.controller.js",
"app_client/common/directives/footerGeneric/footerGeneric.directive.js",
"app_client/common/directives/navigation/navigation.controller.js",
"app_client/common/directives/fileModel/fileModel.directive.js",
"app_client/home/home.controller.js",
"app_client/grocery/grocery.controller.js",
"app_client/meatandfish/meatandfish.controller.js",
"app_client/riceandflour/riceandflour.controller.js",
"app_client/kitchenandhome/kitchenandhome.controller.js",
"app_client/readyfood/readyfood.controller.js",
"app_client/vegetableandfruits/vegetableandfruits.controller.js",
"app_client/herbs/herbs.controller.js",
"app_client/aboutus/aboutus.controller.js",
"app_client/login/login.controller.js",
"app_client/register/register.controller.js",
"app_client/profile/profile.controller.js",
"app_client/settings/settings.controller.js",
"app_client/settings/manage/manage.controller.js",
"app_client/bye/bye.controller.js",
"app_client/products/singleproducts.controller.js"
];

var uglified = uglifyjs.minify(client_files, {compress: true});

fs.writeFile('public/js/app.master.js', uglified.code, function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('scripted minified');
	}
});


/*
|----------------------------------------------------------------
| setting up back-end api routes.
|----------------------------------------------------------------
*/
var 		apiRoutes 	=	require('./app_server/routes/index');

// passport initialize.
app.use(passport.initialize());

app.use('/api', apiRoutes);

/*
|----------------------------------------------------------------
| loading template engine for all routes.
|----------------------------------------------------------------
*/
app.use(function(req, res){
	res.sendFile(path.join(__dirname + "/app_client", "index.html"));
});


/*
|----------------------------------------------------------------
| Starting the server.
|----------------------------------------------------------------
*/
app.listen(process.env.port, function(){
	console.log("Server running on\t:"+process.env.port);
});

