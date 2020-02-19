
// --------------------------------------------------

var pages = require( './tasks/pages.js' );
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
		pages.make,
		stylesheets.make,
		scripts.make,
		scripts.make_components,
	),

	server.start,

	gulp.parallel
	(
		pages.watch,
		stylesheets.watch,
		scripts.watch,
	),
);

// --------------------------------------------------

module.exports.build = gulp.series
(
	server.cleanup,

	gulp.parallel
	(
		pages.make,
		stylesheets.make,
		scripts.make,
		scripts.make_components,
	)
);

// --------------------------------------------------
