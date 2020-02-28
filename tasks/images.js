
// --------------------------------------------------

var server = require( './server.js' );

var gulp = require( 'gulp' );

// --------------------------------------------------

var settings =
{
	src: './src/images/**/*',
	watch: './src/images/**/*',
	dest: './public/static/images/',
};

// --------------------------------------------------

var process_images = function()
{
	return (
		gulp.src( settings.src )
		.pipe( gulp.dest( settings.dest ) )
		.pipe( server.resync() )
	);
};

// --------------------------------------------------

var watch_images = function( callback )
{
	gulp.watch( settings.watch , process_images );

	callback();
};

// --------------------------------------------------

module.exports =
{
	settings: settings,
	process: process_images,
	watch: watch_images,
};

// --------------------------------------------------
