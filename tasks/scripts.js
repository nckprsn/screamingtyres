
// --------------------------------------------------

var server = require( './server.js' );

var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );

// --------------------------------------------------

var settings =
{
	src:
	{
		components: './src/components/*/scripts.js',
		scripts: './src/scripts/**/*.js',
	},
	watch: [ './src/scripts/**/*.js' , './src/components/*/scripts.js' ],
	dest: './public/static/js/',
};

// --------------------------------------------------

var make_scripts = function()
{
	return (
		gulp.src( settings.src.scripts )
		.pipe( gulp.dest( settings.dest ) )
		.pipe( server.resync() )
	);
};

// --------------------------------------------------

var make_component_scripts = function()
{
	return (
		gulp.src( settings.src.components )
		.pipe( rename( function( path , file )
		{
			// Rename scripts.js to component name
			path.basename = path.dirname;
			path.dirname = '.';
		} ) )
		.pipe( gulp.dest( settings.dest ) )
		.pipe( server.resync() )
	);
};

// --------------------------------------------------

var watch_scripts = function( callback )
{
	gulp.watch( settings.watch , make_scripts );

	callback();
};

// --------------------------------------------------

module.exports =
{
	settings: settings,
	make: make_scripts,
	make_components: make_component_scripts,
	watch: watch_scripts,
};

// --------------------------------------------------
