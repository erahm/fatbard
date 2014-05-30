define(
    ["jquery"],
    function( $ ){
        var ProfileEvents = function(){},
            bindingContext = $( document );

        ProfileEvents.prototype.registerEvents = function(){
            this.registerViewEvents();
        };

        ProfileEvents.prototype.registerViewEvents = function(){
        };

        return ProfileEvents;
    }
);
