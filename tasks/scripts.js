
// --------------------------------------------------

var server = require( './server.js' );

var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );

// --------------------------------------------------

var settings =
{
	src:
	{
		components: './src/components/**/*.js',
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

		// Just move scripts into the destination for now

		.pipe( gulp.dest( settings.dest ) )
		.pipe( server.resync() )
	);
};

// --------------------------------------------------

var make_component_scripts = function()
{
	return (
		gulp.src( settings.src.components )

		// Strip directory from component script paths
		.pipe( rename( function( path , file ) { path.dirname = '.'; } ) )

		.pipe( gulp.dest( settings.dest ) )
		.pipe( server.resync() )
	);
};

// --------------------------------------------------

var watch_scripts = function( callback )
{
	gulp.watch( settings.watch , gulp.parallel( make_scripts , make_component_scripts ) );

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
