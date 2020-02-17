
'use strict';

// --------------------------------------------------

/**
 *  Constructor. Also says hello.
 *
 *  @class
 *  @param {Object} settings - Key/value pairs.
 *  @param {string} settings.who - Who to greet when created.
*/

var EXAMPLE = function( settings )
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

EXAMPLE.prototype.hello = function()
{
	console.log( 'Hello ' + this.settings.who );

	return true;
};

// --------------------------------------------------
// Testing out the loader

if( typeof loader == 'object' )
{
	loader.register( 'example' , [ 'utils/classes' ] , function()
	{
		CLASSES.add( document.body , 'ready' );
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
		var component = new EXAMPLE( { who: 'Nick' } );
	}

})();
*/
// --------------------------------------------------
