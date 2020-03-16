
'use strict';

// --------------------------------------------------

/**
 * Player object.
 *
 * @class
 * @param {Object} properties - Key/value pairs.
 * @param {HTMLElement} properties.$container - Containing DOM element.
 * @param {Object} properties.position - Player position.
 * @param {Object} properties.inertia - Player inertia.
 * @param {string} properties.colour - Player colour.
*/

var PLAYER = function( properties )
{
	// ⚠ Copies all supplied properties onto our object
	// ⚠ Will not override any existing properties
	for( var property in properties )
	{
		if( !this.hasOwnProperty( property ) ) this[ property ] = properties[ property ];
	}

	// General set up
	this.initialise();

	// Turn it on
	this.activate();
};

// --------------------------------------------------

/**
 * Cold-start setup.
*/

PLAYER.prototype.initialise = function()
{
	// Temporary!
	this.map = new MAP();

	// Create a car for our player
	this.car = new CAR(
	{
		$container: this.$container,
		position: this.position,
		inertia: this.inertia,
		colour: this.colour,
		boundary_test: function( position )
		{
			return ( position.x >= 0 && position.x < 56 && position.y >= 0 && position.y < 48 );
		}.bind( this ),
	});

	// Create a car for our player
	this.cursor = new CURSOR(
	{
		$container: this.$container,
		car: this.car,
		position:
		{
			x: this.car.dot.position.x,
			y: this.car.dot.position.y,
		},
		colour: this.colour,
		boundary_test: function( position )
		{
			return ( position.x >= 0 && position.x < 56 && position.y >= 0 && position.y < 48 );
		}.bind( this ),
		action: function( position )
		{
			this.car.move_to( position );
			this.cursor.move_to( this.car.dot.position );
			this.moves.update();
		}.bind( this ),
	});

	// Create moves
	this.moves = new MOVES(
	{
		$container: this.$container,
		center: function(){ return this.car.dot.position; }.bind( this ),
		viewpoint: function(){ return this.car.position; }.bind( this ),
		colour: this.colour,
		is_valid: function( from , to )
		{
			return this.map.is_valid( from , to );
		}.bind( this ),
	});
};

// --------------------------------------------------

/**
 * Activates the player.
*/

PLAYER.prototype.activate = function()
{
};

// --------------------------------------------------

/**
* Deactivates the player.
*/

PLAYER.prototype.deactivate = function()
{
};

// --------------------------------------------------

/**
 * Update.
*/

PLAYER.prototype.update = function()
{
	return true;
};

// --------------------------------------------------

if( typeof loader == 'object' )
{
	loader.register( 'player' , [ 'cursor' , 'car' , 'moves' , 'map' ] );
}

// --------------------------------------------------
