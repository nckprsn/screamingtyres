
'use strict';

// --------------------------------------------------

/**
 * Container class for the user interface
 *
 * @class
 * @param {Object} settings - Key/value pairs.
*/

var UI = function( settings )
{
	this.cursor = this.init_cursor();
};

// --------------------------------------------------

/**
 * Creates a cursor.
 *
 * @returns {CURSOR} Returns a new cursor object.
*/

UI.prototype.init_cursor = function()
{
	var cursor = new CURSOR(
	{
		position: { x: 10 , y: 10 },
		colour: 'deeppink',
		boundary_test: function( position )
		{
			return ( position.x >= 0 && position.x < 56 && position.y >= 0 && position.y < 48 );
		},
	} );
};

// --------------------------------------------------

if( typeof loader == 'object' )
{
	loader.register( 'ui' , [ 'cursor' ] , function()
	{
		var ui = new UI();
	} );
}

// --------------------------------------------------
