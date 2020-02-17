
// --------------------------------------------------

var stylesheets = require( './tasks/stylesheets.js' );
var scripts = require( './tasks/scripts.js' );
var server = require( './tasks/server.js' );

// --------------------------------------------------

var gulp = require( 'gulp' );

// --------------------------------------------------

module.exports.default = gulp.series
(
	server.cleanup,
	
	gulp.parallel
	(
		stylesheets.make,
		scripts.make,
		scripts.make_components,
	),

	server.start,

	gulp.parallel
	(
		stylesheets.watch,
		scripts.watch,
	),
);

// --------------------------------------------------
