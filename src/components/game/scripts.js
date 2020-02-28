
'use strict';

// --------------------------------------------------

/**
 *  Constructor. Also says hello.
 *
 *  @class
 *  @param {Object} settings - Key/value pairs.
 *  @param {string} settings.who - Who to greet when created.
*/

var GAME = function( settings )
{
	// Force to empty object if not set
	settings = ( typeof settings != 'undefined' ? settings : {} );

	// Populate our settings
	this.settings =
	{
		// `who` must always be a string
		who: typeof settings.who != 'undefined' ? settings.who : 'world',
	};

	// Send greeting
	this.hello();
};

// --------------------------------------------------

/**
 *  Says hello.
 *
 *  @returns {boolean} Always returns true.
*/

GAME.prototype.hello = function()
{
	console.log( 'Hello ' + this.settings.who );

	return true;
};

// --------------------------------------------------
// Testing out the loader

if( typeof loader == 'object' )
{
	loader.register( 'game' , [ 'utils/classes' ] , function()
	{
		// initialise!!!
	} );
}

// --------------------------------------------------

/**
 *  Self initialisation.
*/
/*
(function ()
{
	// Get all DOM elements matching our component's class
	var elements = document.querySelectorAll( '.namespace_component' );

	// Abandon if none found
	if( !elements ) return false;

	// Create an instance for each element
	for( var i = 0 ; i < elements.length ; i ++ )
	{
		var component = new GAME( { who: 'Nick' } );
	}

})();
*/
// --------------------------------------------------
