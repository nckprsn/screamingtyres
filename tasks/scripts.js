
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

var browserify = require( 'browserify' );
var tap = require( 'gulp-tap' );
var buffer = require( 'gulp-buffer' );
var sourcemaps = require( 'gulp-sourcemaps' );
var uglify = require( 'gulp-uglify' );

// --------------------------------------------------

var make_scripts = function()
{
	return (
		gulp.src( settings.src.scripts )

		// Browserify each script without changing its file name
		// .pipe( tap( function( file )
		// {
		// 	file.contents = browserify( file.path , { debug: true } ).bundle();
		// } ) )

		// .pipe( buffer() )
		// .pipe( sourcemaps.init( { loadMaps: true } ) )
		// .pipe( uglify() )
		// .pipe( sourcemaps.write( './' ) )

		.pipe( gulp.dest( settings.dest ) )
		.pipe( server.resync() )
	);
};

// --------------------------------------------------

var make_component_scripts = function()
{
	return (
		gulp.src( settings.src.components )

		// Browserify each script without changing its file name
		// .pipe( tap( function( file )
		// {
		// 	file.contents = browserify( file.path , { debug: true } ).bundle();
		// } ) )

		// Rename scripts.js to component name
		.pipe( rename( function( path , file )
		{
			path.basename = path.dirname;
			path.dirname = '.';
		} ) )

		// .pipe( buffer() )
		// .pipe( sourcemaps.init( { loadMaps: true } ) )
		// .pipe( uglify() )
		// .pipe( sourcemaps.write( './' ) )

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
