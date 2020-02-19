
// --------------------------------------------------

/**
 *
*/

var CLASSES =
{
	has: function( $element , name )
	{
		if( $element.classList )
		{
			return $element.classList.contains( name );
		}
		else
		{
			return new RegExp( '\\b' + name + '\\b' ).test( $element.className );
		}
	},

	add: function( $element , name )
	{
		if( $element.classList )
		{
			$element.classList.add( name );
		}
		else
		{
			if( !this.has( $element , name ) )
			{
				$element.className += ' ' + name;
			}
		}
	},

	remove: function( $element , name )
	{
		if( $element.classList )
		{
			$element.classList.remove( name );
		}
		else
		{
			$element.className = $element.className.replace( new RegExp( '\\b' + name + '\\b' , 'g' ) , '' );
		}
	},
};

// --------------------------------------------------
