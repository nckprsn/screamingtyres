
'use strict';

// --------------------------------------------------

/**
 *  Cursor object that moves on keyboard input.
 *
 *  @class
 *  @param {Object} properties - Key/value pairs.
 *  @param {Object} properties.position - Cursor position.
 *  @param {number} properties.position.x - Cursor position from left.
 *  @param {number} properties.position.y - Cursor position from top.
 *  @param {string} properties.colour - Cursor colour.
 *  @param {function} properties.boundary_test - Should return true if the cursor can move to the passed position.
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
 * @destructor
*/

CURSOR.prototype.destroy = function()
{
	// Deactivate first to remove any event listeners
	this.deactivate();

	// Delete our cursor's DOM element
	this.$cursor.parentElement.removeChild( this.$cursor )
};

// --------------------------------------------------

/**
 * Cold-start setup.
*/

CURSOR.prototype.initialise = function()
{
	// Create a DOM element for the cursor
	// (currently from static content in UI template)
	this.$cursor = document.querySelector( '.st_cursor' );
	// CLASSES.add( this.$cursor , 'st_cursor' );

	// Set the cursor colour if provided
	if( this.colour )
	{
		this.$cursor.style.setProperty( '--colour' , this.colour );
	}

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
};

// --------------------------------------------------

/**
 * Deactivates the cursor.
*/

CURSOR.prototype.deactivate = function()
{
	// Unhook any event listeners
	document.body.removeEventListener( 'keydown' , this.keystroke_handler );
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
			this.destroy();
			handled = true;
			break;
	}

	// Prevent the default action this event would usually trigger
	if( handled ) e.preventDefault();

};

// --------------------------------------------------
// Register dependencies and initialise

if( typeof loader == 'object' )
{
	loader.register( 'cursor' , [ 'utils/classes' ] );
}

// --------------------------------------------------
