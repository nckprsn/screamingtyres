
'use strict';

// --------------------------------------------------

/**
 * Track object.
 *
 * @class
 * @param {Object} properties - Key/value pairs.
*/

var MAP = function( properties )
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
	// this.activate();
};

// --------------------------------------------------

/**
 * Cold-start setup.
*/

MAP.prototype.initialise = function()
{
	var g =
	{
		name: 'grass',
		is_valid: function(){ return false; },
	};

	var t =
	{
		name: 'tarmac',
		is_valid: function(){ return true; },
	};

	var p =
	{
		name: 'pits',
		is_valid: function(){ return true; },
	};

	this.map =
	[
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,g,g,g,g,g,g,g,t,t,t,g,g,g,t,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,g,g,g,g,g,g,t,t,t,g,g,t,t,t,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,g,g,g,g,g,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,g,g,g,g,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,t,t,p,p,t,t,g,g,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
		[ g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g, ],
	];
};

// --------------------------------------------------

MAP.prototype.is_valid = function( from , to )
{
	if( !this.map[ to.y ][ to.x ].is_valid() ) return false;

	if( !this.line_of_sight( from , to ) ) return false;

	return true;
};

// --------------------------------------------------

/**
* Determines if a point has a clear view to another, according to this.map
*
* @param {Object} from - Start coordinates.
* @param {Object} to - Start coordinates.
*
* @returns {boolean}
*/

MAP.prototype.line_of_sight = function( from , to )
{
	var path = this.trace( from , to );

	for( var i = 0 ; i < path.length ; i ++ )
	{
		if( !this.map[ path[ i ].y ][ path[ i ].x ].is_valid() )
		{
			return false;
		}
	}

	return true;
};

// --------------------------------------------------

/**
 * Draws a line between two grid items.
 *
 * @param {Object} from - Start coordinates.
 * @param {Object} to - Start coordinates.
 *
 * @returns {array} An array of map coordinates representing the path between `from` and `to`.
*/

MAP.prototype.trace = function( from , to )
{
	// ⚠ This algorithm changes `from` - make copies!
	to   = { x:to.x   , y:to.y   };
	from = { x:from.x , y:from.y };

	// The path that we'll eventually return
	var path = [];

	// Work out our relative movement
	var dx = Math.abs( to.x - from.x );
	var dy = -1 * Math.abs( to.y - from.y );

	// Get an increment for each axis
	var sx = from.x < to.x ? 1 : -1;
	var sy = from.y < to.y ? 1 : -1;

	var err = dx + dy;

	while( true )
	{
		// Add to the returnable
		path.push( { x:from.x , y:from.y } );

		// If we're at `to` then exit our loop
		if( from.x == to.x && from.y == to.y ) break;

		var e2 = 2*err;

		if( e2 >= dy )
		{
			err += dy;
			from.x += sx;
		}

		if( e2 <= dx )
		{
			err += dx;
			from.y += sy;
		}
	}

	return path;
};

// --------------------------------------------------

if( typeof loader == 'object' )
{
	loader.register( 'track' , [] );
}

// --------------------------------------------------
