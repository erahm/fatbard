define(
    [
        // Libraries
        "backbone", "underscore", "jquery",
        "ajax/login"
    ],
    function( Backbone, _, $, LoginAjax ){
        var vent = window.fatbard.channels.login || _.extend( {}, Backbone.Events ),
            ENTER_KEY_CODE = 13;

        vent.on( "login:submit", function(){
            console.log( "Performing Login" );
        });

        window.fatbard.channels.login = vent;
        return vent;
    }
);
