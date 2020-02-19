
// --------------------------------------------------

var server = require( './server.js' );

var gulp = require( 'gulp' );
const nunjucks = require( 'nunjucks' );
const fs = require( "fs" );

// --------------------------------------------------

var settings =
{
	// TODO: Get this from src dir
	pages:
	[
		'./src/pages/new.json',
		'./src/pages/join.json',
		'./src/pages/home.json',
	],
	template_dir: './src/templates/',
	src: './src/pages/**/*.json',
	watch: [ './src/pages/**/*.json' , './src/templates/**/*.njk' ],
	dest: './public/',
};

// --------------------------------------------------

var make_pages = function( callback )
{
	let njk = nunjucks.configure( settings.template_dir );

	settings.pages.map( function( page_path )
	{
		var data = JSON.parse( fs.readFileSync( page_path , 'utf8' ) );

		fs.mkdir( settings.dest + data.meta.slug , { "recursive":true } , function()
		{
			fs.writeFile( settings.dest + data.meta.slug + '/index.html' , nunjucks.render( 'html.njk' , data ) , function(){} );
		} );
	} );

	callback();
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
