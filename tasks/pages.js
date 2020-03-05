
// --------------------------------------------------

var server = require( './server.js' );

var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var nunjucks = require( 'nunjucks' );
var through = require( 'through2' );
var fs = require( 'fs' );

// --------------------------------------------------

var settings =
{
	template_dir: './src/templates/',
	src: './src/pages/**/index.json',
	watch:
	[
		'./src/pages/**/index.json',
		'./src/pages/**/*.html',
		'./src/templates/**/*.njk',
	],
	dest: './public/',
};

// --------------------------------------------------
// Set up Nunjucks

var njk = nunjucks.configure( settings.template_dir,
{
	autoescape: false,
	noCache: true, // Otherwise watch-triggered tasks have no effect
} );

njk.addFilter( 'i' , function( input , count )
{
	var indent = '';

	while( count -- ) indent += '\t';

	return input.replace( /^(.+)$/gm , indent + '$1' );
} );

// --------------------------------------------------

var make_pages = function( callback )
{
	return (
		gulp.src( settings.src )

		.pipe( render_pages() )

		// Rename to [path]/index.html
		.pipe( rename( function( path , file )
		{
			path.basename = 'index';
			path.extname = '.html';
		} ) )

		.pipe( gulp.dest( settings.dest ) )

		.pipe( server.resync( '**/*.html' ) )
	);
};

// --------------------------------------------------

var render_pages = function()
{
	return through.obj( function( file , encoding , callback )
	{
		var data = JSON.parse( file.contents.toString() );

		var cwd = file.history[ 0 ].substring( 0 , file.history[ 0 ].lastIndexOf( '/' ) + 1 );

		resolve_file_mappings( data , cwd );

		var output = render_template( `${ data.template }.njk` , data );

		// TODO: capture any errors

		file.contents = Buffer.from( output );

		callback( null , file );
	} );
};

// --------------------------------------------------

var render_template = function( template_path , data )
{
	return njk.render( template_path , data )
};

// --------------------------------------------------

/**
 * Replaces properties starting with `@` with the contents of the file at that path.
*/

var resolve_file_mappings = function( object , cwd )
{
	Object.keys( object ).forEach( function( key )
	{
		// Apply to all string properties starting with `@`
		if( typeof object[ key ] == 'string' && object[ key ].indexOf( '@' ) === 0 )
		{
			var path = cwd + object[ key ].substring( 1 );

			var content = fs.readFileSync( path ).toString();

			object[ key ] = content;
		}

		// Recurse into this property's properties if applicable
		if( typeof object[ key ] == 'Object' )
		{
			resolve_file_mappings( object[ key ] , cwd );
		}
	} );
};

// --------------------------------------------------

var watch_pages = function( callback )
{
	gulp.watch( settings.watch , make_pages );

	callback();
};

// --------------------------------------------------

module.exports =
{
	settings: settings,
	make: make_pages,
	watch: watch_pages,
};

// --------------------------------------------------
