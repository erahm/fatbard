define(
    [
        // Libraries
        "backbone", "underscore"
    ],
    function( Backbone, _ ){
        var UserModel = Backbone.Model.extend({
                "urlRoot": "/api/user/",
                "defaults": {
                    "name": "User",
                },

                // GETTERS
                "getName": function(){
                    return this.get( "name" );
                }

                // SETTERS
                "setName": function( name ){
                    this.set( "name", name );
                }
            });

        return UserModel;
    }
);
