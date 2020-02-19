
// --------------------------------------------------

/**
 * A dynamic dependency loader for one's JavaScripts.
 *
 * Usage:
 *
 * ```
 * // index.html
 *
 * <script src="loader.js"></script>
 * <script>var loader = new LOADER( { src_prefix: '/path/to/scripts/' } );</script>
 * <script src="myscript.js"></script>
 * ```
 *
 * ```
 * // myscript.js
 *
 * loader.register( 'myscript' , [ 'dependency' , 'another_dependency' ] , function()
 * {
 * 	// Code to run when the dependencies have loaded.
 * } );
 * ```
 *
 * @class
 * @param {Object} settings - Key/value pairs of settings.
 * @param {string} settings.src_prefix - .
 * @param {string} settings.src_suffix - .
*/

var LOADER = function( settings )
{
	// This makes the next step less verbose
	if( typeof settings == 'undefined' ) settings = {};

	// Store settings and apply defaults where applicable
	this.settings =
	{
		src_prefix: typeof settings.src_prefix == 'string' ? settings.src_prefix : '',
		src_suffix: typeof settings.src_suffix == 'string' ? settings.src_suffix : '.js',
	}

	// We'll use this to store data on our scripts
	this.scripts = {};
}

// --------------------------------------------------

/**
 *
*/

LOADER.prototype.register = function( name , dependencies , callback )
{
	// Allow `dependencies` parameter to be omitted
	if( typeof callback != 'function' && typeof dependencies == 'function' )
	{
		callback = dependencies;
		dependencies = [];
	}

	// Add to our list of scripts
	this.scripts[ name ] =
	{
		dependencies: dependencies,
		callback: callback,
	};

	// Start loading other dependencies
	for( var d = 0 ; d < dependencies.length ; d ++ )
	{
		// Inject if not already registered
		if( typeof this.scripts[ dependencies[ d ] ] == 'undefined' ) this.inject( dependencies[ d ] );
	}

	// Wait for callbacks...
}

// --------------------------------------------------

/**
 *
*/

LOADER.prototype.resolve = function( name )
{
	// Abandon if dependencies aren't all ready
	if( !this.are_ready( this.scripts[ name ].dependencies ) ) return;

	// Run the callback if it exists
	if( typeof this.scripts[ name ].callback == 'function' ) this.scripts[ name ].callback();

	// Update the script's status to ready (callback completed)
	this.scripts[ name ].status = 'ready';

	// Check for any scripts waiting on this one
	for( var dependent_name in this.scripts )
	{
		// Skip if this script doesn't have any dependencies
		if( typeof this.scripts[ dependent_name ].dependencies != 'object' ) continue;

		// Skip if our script is not amongst the dependencies
		if( this.scripts[ dependent_name ].dependencies.indexOf( name ) == -1 ) continue;

		// Recursion! See if all this dependent can complete too
		this.resolve( dependent_name );
	}
}

// --------------------------------------------------

/**
 *
*/

LOADER.prototype.inject = function( name )
{
	// Create a blank entry in our list for this script if not already there
	if( typeof this.scripts[ name ] == 'undefined' ) this.scripts[ name ] = {};

	// Build the script's URL
	var script_src = this.settings.src_prefix + name + this.settings.src_suffix;

	// Make a callback function
	var callback = function()
	{
		// Update the script's status
		this.scripts[ name ].status = 'loaded';

		// Resolve any dependencies
		this.resolve( name );
	};

	// Make an error callback function
	var oops = function()
	{
		// Update the script's status
		this.scripts[ name ].status = 'error';

		throw '[LOADER] Script failed to load: ' + name;
	};

	// Generate a script tag
	var $script = document.createElement( "script" );

	$script.src = script_src; // Give it our script's URL
	$script.onload = callback.bind( this ); // Attach a callback to run when loaded
	$script.onerror = oops.bind( this ); // Run this if loading fails

	// Inject our script tag into the DOM
	document.head.appendChild( $script );

	// Update the script's status
	this.scripts[ name ].status = 'loading';

	// Wait for the <script>'s onload callback to fire...
}

// --------------------------------------------------

/**
 *
*/

LOADER.prototype.are_ready = function( scripts )
{
	// If there are no scripts provided
	if( !scripts ) return true;

	// Check each script against the info in our list
	for( var s = 0 ; s < scripts.length ; s ++ )
	{
		// Return false if it doesn't exist
		if( typeof this.scripts[ scripts[ s ] ] == 'undefined' ) return false;

		// Return false if its status is anything but ready (ie; callback completed)
		if( this.scripts[ scripts[ s ] ].status != 'ready' ) return false;
	}

	// Cool, all these scripts are ready
	return true;
}

// --------------------------------------------------
