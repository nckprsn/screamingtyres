
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

		<!-- Wheels -->
		<rect x="17" y="20" width="66" height="22" rx="0.1em" fill="#444444" />
		<rect x="17" y="60" width="66" height="22" rx="0.1em" fill="#444444" />

		<!-- Exhausts -->
		<rect x="35" y="90" width="6" height="6" fill="#333333" />
		<rect x="59" y="90" width="6" height="6" fill="#333333" />

		<!-- Body -->
		<rect x="25" y="10" width="50" height="80" rx="0.3em" ry="0.4em" fill="currentcolor" />

		<!-- Roof -->
		<path d="M33 50v25C40 85, 60 85, 67 75v-25Z" fill="rgba( 0,0,0 , 0.3 )" />

		<!-- Single stripe -->
		<rect x="45" y="10" width="10" height="80" rx="0.1em" fill="white" />

		<!-- Double stripes -->
		<!-- <rect x="42" y="11" width="6" height="78" rx="0.05em" fill="white" />
		<rect x="52" y="11" width="6" height="78" rx="0.05em" fill="white" /> -->

		<!-- Windscreen -->
		<path d="M33 50v-5C40 33, 60 33, 67 45v5Z" fill="#444444" />

		<!-- Number dot -->
		<circle cx="50" cy="66" r="13" fill="white" />
		<!-- <text x="50" y="67.5" text-anchor="middle" font-size="22" dominant-baseline="text-top" alignment-baseline="middle" style="font-family:monospace; font-weight:bold;">😜</text> -->
		<!-- <text x="50" y="67.5" text-anchor="middle" font-size="22" dominant-baseline="text-top" alignment-baseline="middle" style="font-family:sans-serif; font-weight:bold; letter-spacing:-0.1em;">73</text> -->

		<!-- Lights -->
		<ellipse cx="34" cy="16" rx="7" ry="5" fill="rgba( 0,0,0 , 0.4 )" transform="rotate(-35 35 15)"/>
		<ellipse cx="66" cy="16" rx="7" ry="5" fill="rgba( 0,0,0 , 0.4 )" transform="rotate( 35 65 15)"/>

		<!-- Body outline -->
		<rect x="25" y="10" width="50" height="80" rx="0.3em" ry="0.4em" stroke="#333333" stroke-width="0.125em" fill="transparent" />


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
	});

	// Set an initial angle to match the inertia
	this.angle = this.angle_to(
	{
		x: this.position.x + this.inertia.x,
		y: this.position.y + this.inertia.y,
	});
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
	});

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
