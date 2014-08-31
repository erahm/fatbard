define(
    function(){
        var Utilities = {};

        Utilities.extend = function( parent, child ){
            var childPrototype = child.prototype,
                key;

            child.prototype = Object.create( parent.prototype );
            for( key in childPrototype ){
                child.prototype[ key ] = childPrototype[ key ];
            }

            child.prototype.constructor = child;

            Object.defineProperty( child.prototype, 'constructor', {
                enumerable: false,
                value: child
            });
        };

        return Utilities;
    }
);
