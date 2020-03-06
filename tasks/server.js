
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

var server_cleanup = function( callback )
{
	return del( settings.cleanup );
};

// --------------------------------------------------

var server_start = function( callback )
{
	browsersync.init(
	{
		server: { baseDir: settings.base_dir },
		open: false,
	} );

	callback();
};

// --------------------------------------------------

var server_resync = function( callback )
{
	return browsersync.stream();
};

// --------------------------------------------------

var server_reload = function( callback )
{
	return browsersync.reload();
};

// --------------------------------------------------

module.exports =
{
	settings: settings,
	start: server_start,
	resync: server_resync,
	reload: server_reload,
	cleanup: server_cleanup,
};

// --------------------------------------------------
