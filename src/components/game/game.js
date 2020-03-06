
'use strict';

// --------------------------------------------------

/**
 * Container class for the user interface
*/

var GAME = function( settings )
{
	var car = new CAR(
	{
		$container: document.querySelector( '.st_track' ),
		position: { x: 12 , y: 11 },
		angle: -60,
		colour: 'deeppink',
		boundary_test: function( position )
		{
			return ( position.x >= 0 && position.x < 56 && position.y >= 0 && position.y < 48 );
		},
	} );

	var cursor = new CURSOR(
	{
		$container: document.querySelector( '.st_track' ),
		position: { x: 10 , y: 10 },
		colour: 'deeppink',
		boundary_test: function( position )
		{
			return ( position.x >= 0 && position.x < 56 && position.y >= 0 && position.y < 48 );
		},
		action: function( position )
		{
			car.move_to( position );
		}
	} );

};

// --------------------------------------------------

if( typeof loader == 'object' )
{
	loader.register( 'game' , [ 'cursor' , 'car' ] , function()
	{
		var game = new GAME();
	} );
}

// --------------------------------------------------
