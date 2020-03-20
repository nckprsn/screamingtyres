
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
		position: { x: 15 , y: 18 },
		inertia: { x: -1 , y: -2 },
		colour: 'orangered',
	});

};

// --------------------------------------------------

if( typeof loader == 'object' )
{
	loader.register( 'game' , [ 'player' , 'map' ] , function()
	{
		var map = new MAP();
		var game = new GAME();
	});
}

// --------------------------------------------------
