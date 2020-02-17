
// --------------------------------------------------

var server = require( './server.js' );

var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );

// --------------------------------------------------

var settings =
{
	src: './src/stylesheets/*.scss',
	watch: [ './src/stylesheets/**/*.scss' , './src/components/**/*.scss' ],
	dest: './public/static/css/',
};

// --------------------------------------------------

var make_stylesheets = function()
{
	return (
		gulp.src( settings.src )
		.pipe( sass() )
		.pipe( gulp.dest( settings.dest ) )
		.pipe( server.resync() )
	);
};

// --------------------------------------------------

var watch_stylesheets = function( callback )
{
	gulp.watch( settings.watch , make_stylesheets );

	callback();
};

// --------------------------------------------------

module.exports =
{
	settings: settings,
	make: make_stylesheets,
	watch: watch_stylesheets,
};

// --------------------------------------------------
