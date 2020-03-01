
'use strict';

// --------------------------------------------------

/**
 *  Constructor.
 *
 *  @class
 *  @param {Object} settings - Key/value pairs.
 *  @param {Object} settings.position - Cursor position
 *  @param {number} settings.position.x - Cursor position from left
 *  @param {number} settings.position.y - Cursor position from top
*/

var CURSOR = function( settings )
{
	// Force to empty object if not set
	settings = ( typeof settings != 'undefined' ? settings : {} );

	// Populate our settings
	this.settings =
	{
		position:
		{
			x: typeof settings.x != 'undefined' ? settings.x : 0,
			y: typeof settings.y != 'undefined' ? settings.y : 0,
		},
	};

	this.update();
};

// --------------------------------------------------

/**
 *  Sets the cursor position.
 *
 *  @returns {boolean} Always returns true.
*/

CURSOR.prototype.update = function()
{
	return true;
};

// --------------------------------------------------
// Testing out the loader

if( typeof loader == 'object' )
{
	loader.register( 'cursor' , [ 'utils/classes' ] , function()
	{
		// initialise!!!
	} );
}

// --------------------------------------------------
