
// --------------------------------------------------

var server = require( './server.js' );

var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var nunjucks = require( 'nunjucks' );
var fs = require( 'fs' );
var Transform = require( 'stream' ).Transform;

// --------------------------------------------------

var settings =
{
	template_dir: './src/templates/',
	src: './src/pages/**/index.json',
	watch: [ './src/pages/**/index.json' , './src/templates/**/*.njk' ],
	dest: './public/',
};

// --------------------------------------------------

var make_pages = function( callback )
{
	return gulp.src( settings.src )

	//
	.pipe( render_pages() )

	// Rename to [path]/index.html
	.pipe( rename( function( path , file )
	{
		path.basename = 'index';
		path.extname = '.html';
	} ) )

	.pipe( gulp.dest( settings.dest ) );
	// .pipe( server.reload() );
};

// --------------------------------------------------

var render_pages = function( callback )
{
	// Monkey patch Transform or create your own subclass,
    // implementing `_transform()` and optionally `_flush()`
    var transformStream = new Transform( { objectMode: true } );
    /**
     * @param {Buffer|string} file
     * @param {string=} encoding - ignored if file contains a Buffer
     * @param {function(Error, object)} callback - Call this function (optionally with an
     *          error argument and data) when you are done processing the supplied chunk.
     */
    transformStream._transform = function( file , encoding , callback )
	{
		var njk = nunjucks.configure( settings.template_dir );

		var error = null;
		var data = JSON.parse( file.contents.toString() );

		var cwd = file.history[ 0 ].substring( 0 , file.history[ 0 ].lastIndexOf( '/' ) + 1 );

		resolve_file_mappings( data , cwd );

		var output = nunjucks.render( 'html.njk' , data )

		file.contents = new Buffer( output );

		callback( error , file );
    };

    return transformStream;
};

// --------------------------------------------------

var resolve_file_mappings = function( object , cwd )
{
	Object.keys( object ).forEach( function( key )
	{
		if( typeof object[ key ] == 'string' && object[ key ].indexOf( '@' ) === 0 )
		{
			var path = cwd + object[ key ].substring( 1 );

			var content = fs.readFileSync( path ).toString();

			object[ key ] = content;
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
