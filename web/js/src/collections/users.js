define(
    ["backbone", "models/user", "localstorage"],
    function( Backbone, User ){
        var Students = Backbone.Collection.extend({
                "model": User,
                "localStorage": new Backbone.LocalStorage( "Users" )
            });

        return Students;
    }
);
