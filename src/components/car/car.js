
'use strict';

// --------------------------------------------------

/**
 * Car object that moves on keyboard input.
 *
 * @class
 * @param {Object} properties - Key/value pairs.
 * @param {HTMLElement} properties.$container - Containing DOM element.
 * @param {Object} properties.position - Car position.
 * @param {number} properties.position.x - Car position from left.
 * @param {number} properties.position.y - Car position from top.
 * @param {number} properties.angle - Car rotation clockwise from vertical in degrees.
 * @param {string} properties.colour - Car colour.
 * @param {function} properties.boundary_test - Should return true if the car can move to the passed position.
*/

var CAR = function( properties )
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

CAR.prototype.initialise = function()
{
	// Create a DOM element for the car
	this.$car = document.createElement( 'div' );
	this.$car.classList.add( 'st_car' );
};

// --------------------------------------------------

/**
 * Activates the car.
*/

CAR.prototype.activate = function()
{
	// Run an update first
	this.update();

	// Inject into containing DOM element
	this.$container.appendChild( this.$car );
};

// --------------------------------------------------

/**
* Deactivates the car.
*/

CAR.prototype.deactivate = function()
{
	// Remove element from the DOM
	this.$container.removeChild( this.$car )
};

// --------------------------------------------------

/**
 * Updates the custom variables on the DOM element.
*/

CAR.prototype.update = function()
{
	// Wrap with requestAnimationFrame so it can resolve later
	window.requestAnimationFrame( function()
	{
		this.$car.style.setProperty( '--position_x' , this.position.x );
		this.$car.style.setProperty( '--position_y' , this.position.y );
		this.$car.style.setProperty( '--angle' , this.angle );
		this.$car.style.setProperty( '--colour' , this.colour );
	}.bind( this ) ); // Bind the callback above to this CAR instance
};

// --------------------------------------------------

/**
 * Moves the car by a given vector.
 *
 * @param {Object} move - Vector to move the car by.
 * @param {number} move.x - Horizontal vector component.
 * @param {number} move.y - Vertical vector component.
 * @returns {boolean} Returns true if the move was successful, false if not.
*/

CAR.prototype.move_by = function( move )
{
	// Work out where the car would move to first
	var new_position =
	{
		x: this.position.x + move.x,
		y: this.position.y + move.y,
	};

	// Abandon if the boundary test fails
	if( !this.boundary_test( new_position ) ) return false;

	this.angle = this.angle_to( new_position );

	// Assign the new position
	this.position = new_position;

	// Sync up the UI
	this.update();

	return true;
};

// --------------------------------------------------

/**
 * Moves the car to a given position.
 *
 * @param {Object} position - Position to move the car to.
 * @param {number} position.x - Horizontal position component.
 * @param {number} position.y - Vertical position component.
 * @returns {boolean} Returns true if the move was successful, false if not.
*/

CAR.prototype.move_to = function( position )
{
	// Abandon if the boundary test fails
	if( !this.boundary_test( position ) ) return false;

	this.angle = this.angle_to( position );

	// Assign the new position
	this.position = position;

	// Sync up the UI
	this.update();

	return true;
};

// --------------------------------------------------

/**
 * Set angle according to movement
 *
 * @param {Object} position - Position to move the car to.
 * @param {number} position.x - Horizontal position component.
 * @param {number} position.y - Vertical position component.
 * @returns {number} Angle between from and to
*/

CAR.prototype.angle_to = function( position )
{
	var delta =
	{
		x: position.x - this.position.x,
		y: position.y - this.position.y,
	};

	var angle = Math.atan2( delta.y , delta.x ) * 180 / Math.PI;

	while( Math.abs( this.angle - angle ) > 180 )
	{
		if( ( this.angle - angle ) >= 180 )
		{
			angle += 360;
		}
		else
		{
			angle -= 360;
		}
	}

	return angle;
};

// --------------------------------------------------
