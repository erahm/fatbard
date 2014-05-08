define(
    ["storage"],
    function( Storage ){
        var Template = function(){},
            base = "window.omakase.templates";

        Template.prototype = new Storage();

        Template.prototype.get = function( key ){
            return Storage.prototype.get.call( this, base, key );
        };

        Template.prototype.set = function( key, val ){
            Storage.prototype.set.call( this, base, key, val );
        };

        return Template;
    }
);
