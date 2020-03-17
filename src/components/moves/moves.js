
'use strict';

// --------------------------------------------------

/**
 * Moves object; creates clickable moves for mouse input.
 *
 * @class
 * @param {Object} properties - Key/value pairs.
 * @param {HTMLElement} properties.$container - Containing DOM element.
 * @param {Object} properties.position - Moves' reference position.
 * @param {string} properties.colour - Moves' colour.
 * @param {function} properties.boundary_test - .
*/

var MOVES = function( properties )
{
	// ⚠ Copies all supplied properties onto our object
	// ⚠ Will not override any existing properties
	for( var property in properties )
	{
		if( !this.hasOwnProperty( property ) ) this[ property ] = properties[ property ];
	}

	// A 2 dimensional array of valid moves and their cost
	// ⚠ Must be square with an odd numbered side length
	this.move_pattern =
	[
		[ null , 1 , 1 , 1 , null ],
		[ 1 , 0 , 0 , 0 , 1 ],
		[ 1 , 0 , 0 , 0 , 1 ],
		[ 1 , 0 , 0 , 0 , 1 ],
		[ null , 1 , 1 , 1 , null ],
	];

	// General set up, create DOM element, etc
	this.initialise();

	// Turn it on
	this.activate();
};

// --------------------------------------------------

/**
 * Cold-start setup.
*/

MOVES.prototype.initialise = function()
{
	// Build our move data from the pattern
	this.moves = [];

	var size = this.move_pattern.length;

	for( var x = 0 ; x < size ; x ++ )
	{
		for( var y = 0 ; y < size ; y ++ )
		{
			if( this.move_pattern[ x ][ y ] != null )
			{
				this.moves.push(
				{
					cost: this.move_pattern[ x ][ y ],
					relative_position:
					{
						x: ( x - Math.floor( size/2 ) ),
						y: ( y - Math.floor( size/2 ) ),
					},
					position:
					{
						x: this.center().x + ( x - Math.floor( size/2 ) ),
						y: this.center().y + ( y - Math.floor( size/2 ) ),
					},
				});
			}
		}
	}

	// Store references to the DOM elements
	this.$moves = [];

	// Create a DOM element for each move
	for( var i = 0 ; i < this.moves.length ; i ++ )
	{
		var $move = document.createElement( 'div' );
		$move.classList.add( 'st_move' );
		this.$moves.push( $move );
	}
};

// --------------------------------------------------

/**
 * Activates the moves.
*/

MOVES.prototype.activate = function()
{
	// Run an update first
	this.update();

	// Activate each move individually
	for( var i = 0 ; i < this.$moves.length ; i ++ )
	{
		var $move = this.$moves[ i ];

		// Inject into containing DOM element
		this.$container.appendChild( $move );
	}
};

// --------------------------------------------------

/**
* Deactivates the moves.
*/

MOVES.prototype.deactivate = function()
{
	// Deactivate each move individually
	for( var i = 0 ; i < this.$moves.length ; i ++ )
	{
		var $move = this.$moves[ i ];

		// Remove each element from the DOM
		this.$container.removeChild( $move )
	}
};

// --------------------------------------------------

/**
 * Updates the custom variables on the DOM element.
*/

MOVES.prototype.update = function()
{
	// Wrap with requestAnimationFrame so it can resolve later
	window.requestAnimationFrame( function()
	{
		for( var i = 0 ; i < this.moves.length ; i ++ )
		{
			// Work out our new position
			var new_position =
			{
				x: this.center().x + this.moves[ i ].relative_position.x,
				y: this.center().y + this.moves[ i ].relative_position.y,
			};

			var is_valid = this.is_valid( this.viewpoint() , new_position );
			// var is_valid = this.is_valid( this.moves[ i ].position , new_position );

			// Assign our new position
			this.moves[ i ].position = new_position;

			// Set all our custom properties
			this.$moves[ i ].style.setProperty( '--position_x' , this.moves[ i ].position.x );
			this.$moves[ i ].style.setProperty( '--position_y' , this.moves[ i ].position.y );
			this.$moves[ i ].style.setProperty( '--colour' , is_valid ? this.colour : 'grey' );

			// Set any modifier states
			this.$moves[ i ].classList.add( 'has_cost_' + this.moves[ i ].cost );

			if( is_valid )
				this.$moves[ i ].classList.remove( 'is_invalid' );
			else
				this.$moves[ i ].classList.add( 'is_invalid' );
		}
	}.bind( this ) ); // Bind the callback above to this MOVES instance

	return true;
};

// --------------------------------------------------

// if( typeof loader == 'object' )
// {
// 	loader.register( 'moves' );
// }

// --------------------------------------------------
