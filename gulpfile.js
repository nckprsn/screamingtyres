
// --------------------------------------------------

var images = require( './tasks/images.js' );
var pages = require( './tasks/pages.js' );
var server = require( './tasks/server.js' );
var scripts = require( './tasks/scripts.js' );
var stylesheets = require( './tasks/stylesheets.js' );

// --------------------------------------------------

var gulp = require( 'gulp' );

// --------------------------------------------------

module.exports.default = gulp.series
(
	server.cleanup,

	gulp.parallel
	(
		images.process,
		pages.make,
		stylesheets.make,
		scripts.make,
		scripts.make_components,
	),

	server.start,

	gulp.parallel
	(
		images.watch,
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
		images.process,
		pages.make,
		stylesheets.make,
		scripts.make,
		scripts.make_components,
	)
);

// --------------------------------------------------
