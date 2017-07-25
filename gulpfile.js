var 	gulp 			= require('gulp'),
		concat 			= require('gulp-concat'),
		sass 			= require('gulp-sass'),
		notify 			= require('gulp-notify'),
		plumber 		= require('gulp-plumber'),
		uglifycss 		= require('gulp-uglifycss'),
		uglify    		= require('gulp-uglify'),
		watch 			= require('gulp-watch');

gulp.task('compile-sass', function(){
	return gulp
		.src('public/sass/app.scss')
		.pipe(sass().on('error', reportError))
		.pipe(plumber())
		.pipe(notify())
		.pipe(uglifycss())
		.pipe(gulp.dest('public/css/'));
});


gulp.task('compile-js', function(){
	return gulp
		.src([
			"public/libs/angular.js",
			"public/libs/angular-resource.js",
			"public/libs/angular-route.js",
			'public/libs/jquery.js', 
			'public/libs/bootstrap.js', 
			'public/libs/modernizr.js',
			'public/libs/master.js'
		])
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js/'));
});


function reportError (error) {

    notify({
        title: 'Gulp Task Error',
        message: 'Check the console.'
    }).write(error);

    console.log(error.toString());

    this.emit('end');
}


gulp.task('default', function(){
	gulp.watch(['public/sass/**/*.scss', 'public/libs/**/*.js'], ['compile-sass', 'compile-js']);
})
