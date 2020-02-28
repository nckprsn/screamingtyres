
'use strict';

// --------------------------------------------------

/**
 *  The start of a Finite State Machine
 *
 *  @class
 *  @param {Object} data - Key/value pairs.
 *  @param {Object} stack - Key/value pairs.
*/

var STATE = function( data , stack )
{
};

// --------------------------------------------------

/**
 *  Moves to the next state in the stack
 *
*/

STATE.prototype.advance = function()
{
};

// --------------------------------------------------

/**
 *  Moves to the previous state in the stack
 *
*/

STATE.prototype.rewind = function()
{
};

// --------------------------------------------------
// Testing out the loader

if( typeof loader == 'object' )
{
	loader.register( 'state' , [] , function()
	{
		console.log( 'Ok, STATE ready.' );
	} );
}

// --------------------------------------------------
