
// --------------------------------------------------

var gulp = require( 'gulp' );
var del = require( 'del' );
var browsersync = require( 'browser-sync' ).create();

// --------------------------------------------------

var settings =
{
	base_dir: './public/',
	cleanup: './public/static/**',
};

// --------------------------------------------------

var cleanup = function( callback )
{
	return del( settings.cleanup );
};

// --------------------------------------------------

var start = function( callback )
{
	browsersync.init(
	{
		server: { baseDir: settings.base_dir },
		open: false,
	} );

	callback();
};

// --------------------------------------------------

var resync = function( callback )
{
	return browsersync.stream();
};

// --------------------------------------------------

module.exports =
{
	settings: settings,
	start: start,
	resync: resync,
	cleanup: cleanup,
};

// --------------------------------------------------
