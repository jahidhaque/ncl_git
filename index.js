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

