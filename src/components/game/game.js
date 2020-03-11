
'use strict';

// --------------------------------------------------

/**
 * Container class for the user interface
*/

var GAME = function( settings )
{
	var player = new PLAYER(
	{
		$container: document.querySelector( '.st_track' ),
		position: { x: 10 , y: 10 },
		inertia: { x: 2 , y: 1 },
		colour: 'deeppink',
	});

};

// --------------------------------------------------

if( typeof loader == 'object' )
{
	loader.register( 'game' , [ 'player' ] , function()
	{
		var game = new GAME();
	});
}

// --------------------------------------------------
