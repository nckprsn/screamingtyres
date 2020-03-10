
'use strict';

// --------------------------------------------------

/**
 * Car object that moves on keyboard input.
 *
 * @class
 * @param {Object} properties - Key/value pairs.
 * @param {HTMLElement} properties.$container - Containing DOM element.
 * @param {Object} properties.position - Car position.
 * @param {Object} properties.inertia - Car inertia.
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

	// Insert the car image
	var $gfx = document.createElement( 'svg' );
	this.$car.innerHTML =
	`<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 100 100">
		<path d="M16 20h68v20h-68Z" fill="#333333" />
		<path d="M16 60h68v20h-68Z" fill="#333333" />
		<path d="M25 10h50v80h-50Z" fill="currentcolor" />
	</svg>`;

	// Create a dot for the car
	this.dot = new DOT(
	{
		$container: this.$container,
		position:
		{
			x: this.position.x + this.inertia.x,
			y: this.position.y + this.inertia.y,
		},
		colour: this.colour,
		boundary_test: this.boundary_test,
	} );
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

	// Activate the dot too
	this.dot.activate();
};

// --------------------------------------------------

/**
* Deactivates the car.
*/

CAR.prototype.deactivate = function()
{
	// Deactivate the dot too
	this.dot.deactivate();

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

	// Update the dot too
	this.dot.update();
};

// --------------------------------------------------

/**
 * Moves the car by a given vector.
 *
 * @param {Object} move - Vector to move the car by.
 * @returns {boolean} Returns true if the move was successful, false if not.
*/

CAR.prototype.move_by = function( move )
{
	// Work out where the car would move to
	var new_position =
	{
		x: this.position.x + move.x,
		y: this.position.y + move.y,
	};

	return this.move_to( new_position );
};

// --------------------------------------------------

/**
 * Moves the car to a given position.
 *
 * @param {Object} position - Position to move the car to.
 * @returns {boolean} Returns true if the move was successful, false if not.
*/

CAR.prototype.move_to = function( position )
{
	// Abandon if the boundary test fails
	if( !this.boundary_test( position ) ) return false;

	// We'll use this to move the dot later
	var delta =
	{
		x: position.x - this.position.x,
		y: position.y - this.position.y,
	};

	// Ignore angle change if move is zero
	if( delta.x != 0 || delta.y != 0 )
	{
		this.angle = this.angle_to( position );
	}

	// Assign the new position
	this.position = position;

	// Move the dot by the same vector as the car, from the car's position
	this.dot.move_to(
	{
		x: this.position.x + delta.x,
		y: this.position.y + delta.y,
	} );

	// Sync up the UI
	this.update();

	return true;
};

// --------------------------------------------------

/**
 * Set angle according to movement
 *
 * @param {Object} position - Position to move the car to.
 * @returns {number} Angle between from and to
*/

CAR.prototype.angle_to = function( position )
{
	var delta =
	{
		x: position.x - this.position.x,
		y: position.y - this.position.y,
	};

	// Gives us a technically correct angle, but not the closest
	var angle = Math.atan2( delta.y , delta.x ) * 180 / Math.PI;

	// Rotate the angle by +n/-n full turns to get the closest angle to existing angle
	while( Math.abs( this.angle - angle ) > 180 )
	{
		if( ( this.angle - angle ) >= 180 )
			angle += 360;
		else
			angle -= 360;
	}

	return angle;
};

// --------------------------------------------------

if( typeof loader == 'object' )
{
	loader.register( 'car' , [ 'dot' ] );
}

// --------------------------------------------------
