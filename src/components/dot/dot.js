
'use strict';

// --------------------------------------------------

/**
 * Dot object that moves on keyboard input.
 *
 * @class
 * @param {Object} properties - Key/value pairs.
 * @param {HTMLElement} properties.$container - Containing DOM element.
 * @param {Object} properties.position - Dot position.
 * @param {string} properties.colour - Dot colour.
 * @param {function} properties.boundary_test - Should return true if the dot can move to the passed position.
*/

var DOT = function( properties )
{
	// ⚠ Copies all supplied properties onto our object
	// ⚠ Will not override any existing properties
	for( var property in properties )
	{
		if( !this.hasOwnProperty( property ) ) this[ property ] = properties[ property ];
	}

	// General set up, create DOM element, etc
	this.initialise();

	// Turn it on
	this.activate();
};

// --------------------------------------------------

/**
 * Cold-start setup.
*/

DOT.prototype.initialise = function()
{
	// Create a DOM element for the dot
	this.$dot = document.createElement( 'div' );
	this.$dot.classList.add( 'st_dot' );

	var $gfx = document.createElement( 'svg' );
	this.$dot.innerHTML =
	`<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 100 100">
		<circle cx="50" cy="50" r="30" fill="currentcolor" />
	</svg>`;
};

// --------------------------------------------------

/**
 * Activates the dot.
*/

DOT.prototype.activate = function()
{
	// Run an update first
	this.update();

	// Inject into containing DOM element
	this.$container.appendChild( this.$dot );
};

// --------------------------------------------------

/**
* Deactivates the dot.
*/

DOT.prototype.deactivate = function()
{
	// Remove element from the DOM
	this.$container.removeChild( this.$dot )
};

// --------------------------------------------------

/**
 * Updates the custom variables on the DOM element.
*/

DOT.prototype.update = function()
{
	// Wrap with requestAnimationFrame so it can resolve later
	window.requestAnimationFrame( function()
	{
		this.$dot.style.setProperty( '--position_x' , this.position.x );
		this.$dot.style.setProperty( '--position_y' , this.position.y );
		this.$dot.style.setProperty( '--colour' , this.colour );
	}.bind( this ) ); // Bind the callback above to this DOT instance

	return true;
};

// --------------------------------------------------

/**
 * Moves the dot by a given vector.
 *
 * @param {Object} move - Vector to move the dot by.
 * @returns {boolean} Returns true if the move was successful, false if not.
*/

DOT.prototype.move_by = function( move )
{
	// Work out where the dot would move to
	var new_position =
	{
		x: this.position.x + move.x,
		y: this.position.y + move.y,
	};

	return this.move_to( new_position );
};

// --------------------------------------------------

/**
 * Moves the dot to a given position.
 *
 * @param {Object} position - Position to move the dot to.
 * @returns {boolean} Returns true if the move was successful, false if not.
*/

DOT.prototype.move_to = function( position )
{
	// Abandon if the boundary test fails
	if( !this.boundary_test( position ) ) return false;

	// Assign the new position
	this.position = position;

	// Sync up the UI
	this.update();

	return true;
};

// --------------------------------------------------
