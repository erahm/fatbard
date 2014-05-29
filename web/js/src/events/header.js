define(
    ["jquery"],
    function( $ ){
        var HeaderEvents = function(){};

        HeaderEvents.prototype.registerEvents = function(){
            this.registerHeaderEvents();
        };

        HeaderEvents.prototype.registerHeaderEvents = function(){
            $( document ).on( "fatbard.click.header/logo", function( e ){
                window.location = "/#/";
            });
        };

        return HeaderEvents;
    }
);
