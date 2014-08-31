define(
    ["events/login"],
    function( vent ){
        var bindings = {
            "click form button[type='submit']": function(){
                vent.trigger( "login:submit" );
                return false;
            }
        };

        return bindings;
    }
);
