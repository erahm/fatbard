define(
    ["storage", "moment"],
    function( Storage, moment ){
        var Data = function(){},
            base = "window.omakase.data";

        Data.prototype = new Storage();

        Data.prototype.get = function( key ){
            var inner       = Storage.prototype.get.call( this, base, key ),
                nowMoment   = moment(),
                value       = {},
                stored,tolerance,storedMoment;

            if( inner ){
                storedMoment    = moment( inner.stored );
                tolerance       = inner.freshnessTolerance;

                if( Math.abs( nowMoment.diff( storedMoment, "seconds" ) ) <= tolerance ){
                    value = inner.data;
                }
            }

            return value;
        };

        Data.prototype.set = function( key, val, tolerance ){
            var inner = {};

            inner.stored                = (new Date()).getTime();
            inner.freshnessTolerance    = tolerance;
            inner.data                  = val;

            Storage.prototype.set.call( this, base, key, inner );
        };

        return Data;
    }
);
