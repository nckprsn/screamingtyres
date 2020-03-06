
'use strict';

// --------------------------------------------------

/**
 * Cursor object that moves on keyboard input.
 *
 * @class
 * @param {Object} properties - Key/value pairs.
 * @param {HTMLElement} properties.$container - Containing DOM element.
 * @param {Object} properties.position - Cursor position.
 * @param {number} properties.position.x - Cursor position from left.
 * @param {number} properties.position.y - Cursor position from top.
 * @param {string} properties.colour - Cursor colour.
 * @param {function} properties.boundary_test - Should return true if the cursor can move to the passed position.
 * @param {function} properties.action - Callback to run if the default action is triggered (eg: user hits `space` or `enter`).
*/

var CURSOR = function( properties )
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

CURSOR.prototype.initialise = function()
{
	// Create a DOM element for the cursor
	this.$cursor = document.createElement( 'div' );
	this.$cursor.classList.add( 'st_cursor' );

	// Bind any event handlers to this CURSOR instance
	this.keystroke_handler = this.keystroke_handler.bind( this )
};

// --------------------------------------------------

/**
 * Activates the cursor.
*/

CURSOR.prototype.activate = function()
{
	// Run an update first
	this.update();

	// Attach event handlers to input events
	document.body.addEventListener( 'keydown' , this.keystroke_handler );

	// Inject into containing DOM element
	this.$container.appendChild( this.$cursor );
};

// --------------------------------------------------

/**
* Deactivates the cursor.
*/

CURSOR.prototype.deactivate = function()
{
	// Unhook any event listeners
	document.body.removeEventListener( 'keydown' , this.keystroke_handler );

	// Remove element from the DOM
	this.$container.removeChild( this.$cursor )
};

// --------------------------------------------------

/**
 * Updates the custom variables on the DOM element.
*/

CURSOR.prototype.update = function()
{
	// Wrap with requestAnimationFrame so it can resolve later
	window.requestAnimationFrame( function()
	{
		this.$cursor.style.setProperty( '--position_x' , this.position.x );
		this.$cursor.style.setProperty( '--position_y' , this.position.y );
		this.$cursor.style.setProperty( '--colour' , this.colour );
	}.bind( this ) ); // Bind the callback above to this CURSOR instance
};

// --------------------------------------------------

/**
 * Moves the cursor position.
 *
 * @returns {boolean} Returns true if the move was successful, false if not.
*/

CURSOR.prototype.move_by = function( move )
{
	// Work out where the cursor would move to first
	var new_position =
	{
		x: this.position.x + move.x,
		y: this.position.y + move.y,
	};

	// Abandon if the boundary test fails
	if( !this.boundary_test( new_position ) ) return false;

	// Assign the new position
	this.position = new_position;

	// Sync up the UI
	this.update();

	return true;
};

// --------------------------------------------------

/**
 * Moves the cursor to a given position.
 *
 * @param {Object} position - Position to move the cursor to.
 * @param {number} position.x - Horizontal position component.
 * @param {number} position.y - Vertical position component.
 * @returns {boolean} Returns true if the move was successful, false if not.
*/

CURSOR.prototype.move_to = function( position )
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

/**
 * Handles keyboard input. Designed to be attached to a keydown event listener.
 *
 * @param {Object} e - Event object
*/

CURSOR.prototype.keystroke_handler = function( e )
{
	// Will use this to see if we need to preventDefault() after processing
	var handled = false;

	switch( e.code )
	{
		case "KeyS":
		case "ArrowDown":
			this.move_by( { x: 0 , y: 1 } );
			handled = true;
			break;

		case "KeyW":
		case "ArrowUp":
			this.move_by( { x: 0 , y: -1 } );
			handled = true;
			break;

		case "KeyA":
		case "ArrowLeft":
			this.move_by( { x: -1 , y: 0 } );
			handled = true;
			break;

		case "KeyD":
		case "ArrowRight":
			this.move_by( { x: 1 , y: 0 } );
			handled = true;
			break;

		case "Escape":
			this.deactivate();
			handled = true;
			break;

		case "Space":
		case "Enter":
			this.action( this.position );
			handled = true;
			break;
	}

	// Prevent the default action this event would usually trigger
	if( handled ) e.preventDefault();
};

// --------------------------------------------------
