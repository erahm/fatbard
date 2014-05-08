define(
    ["require", "underscore"],
    function( require, _ ){
        var Events = {},
            e = window.omakase.config.events;

        Events.startup = function(){
            Events.watch();
        };

        Events.watch = function(){
            _( e ).each( function( co ){
                require(
                    ["events/" + co],
                    function( c ){
                        var C = new c();
                        C.registerEvents();
                    }
                );
            });
        };

        return Events;
    }
);
