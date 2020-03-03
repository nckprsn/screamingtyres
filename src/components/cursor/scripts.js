
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

	// General set up, create DOM element...
	this.initialise();

	// Turn it on
	this.activate();
};

// --------------------------------------------------

/**
 * @destructor
 * @returns {boolean} Always returns true
*/

CURSOR.prototype.destroy = function()
{
	// Deactivate first to remove any event listeners
	this.deactivate();

	// TODO: Delete DOM element

	return true;
};

// --------------------------------------------------

/**
 * Cold-start setup
 *
 * @returns {boolean} Return true on success or false on failure
*/

CURSOR.prototype.initialise = function()
{
	// Create a DOM element for the cursor
	this.$cursor = document.querySelector( '.st_cursor' );

	// CLASSES.add( this.$cursor , 'st_cursorss' );
};

// --------------------------------------------------

/**
 *
 *
 * @returns {boolean} Return true on success or false on failure
*/

CURSOR.prototype.activate = function()
{
	if( this.colour )
	{
		this.$cursor.style.setProperty( '--colour' , this.colour );
	}

	// Run an update first
	this.update();

	// Bind keystroke handler to this CURSOR instance
	this.keystroke_handler = this.keystroke_handler.bind( this )

	// Attach our handler to the keydown event
	document.body.addEventListener( 'keydown' , this.keystroke_handler );
};

// --------------------------------------------------

/**
 *
 *
 * @returns {boolean} Return true on success or false on failure
*/

CURSOR.prototype.deactivate = function()
{
	// Unhook any event listeners
	document.body.removeEventListener( 'keydown' , this.keystroke_handler );
};

// --------------------------------------------------

/**
 * Updates the custom variables on the DOM element to
 *
 * @returns {boolean} Always returns true.
*/

CURSOR.prototype.update = function()
{
	this.$cursor.style.setProperty( '--position_x' , this.position.x );
	this.$cursor.style.setProperty( '--position_y' , this.position.y );
	return true;
};

// --------------------------------------------------

/**
 * Moves the cursor position.
 *
 * @returns {boolean} Always returns true.
*/

CURSOR.prototype.update_position = function( position )
{
	var new_position =
	{
		x: this.position.x + ( position.x != null ? position.x : 0 ),
		y: this.position.y + ( position.y != null ? position.y : 0 ),
	};

	if( !this.boundary_test( new_position ) ) return false;

	this.position = new_position;

	this.update();

	return true;
};

// --------------------------------------------------

/**
 *  Sets the cursor position.
 *
 *  @returns {boolean} Always returns true.
*/

CURSOR.prototype.keystroke_handler = function( e )
{
	var handled = false;

	switch( e.code )
	{
		case "KeyS":
		case "ArrowDown":
			this.update_position( { x: null , y: 1 } );
			handled = true;
			break;

		case "KeyW":
		case "ArrowUp":
			this.update_position( { x: null , y: -1 } );
			handled = true;
			break;

		case "KeyA":
		case "ArrowLeft":
			this.update_position( { x: -1 , y: null } );
			handled = true;
			break;

		case "KeyD":
		case "ArrowRight":
			this.update_position( { x: 1 , y: null } );
			handled = true;
			break;
	}

	if( handled ) e.preventDefault();

};

// --------------------------------------------------
// Testing out the loader

if( typeof loader == 'object' )
{
	loader.register( 'cursor' , [ 'utils/classes' ] , function()
	{
		// initialise!!!
	} );
}

// --------------------------------------------------
