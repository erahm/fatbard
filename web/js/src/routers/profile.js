define(
    ["routers/base", "controllers/profile"],
    function( Base, Controller ){
        var Profile = function( data ){
                this.data = data;
                this.dmz = false;
            },
            page = new Controller();

        Profile.prototype = new Base();

        Profile.prototype.register = function(){
            this.registerView();
        };

        Profile.prototype.registerView = function(){
            var self = this;

            this.data.sammy.before( "#/profile", function( context ){
                return self.filter(
                    undefined,
                    function(){
                        context.redirect( "#/login/" );
                        return false;
                    },
                    "view"
                );
            });

            this.data.sammy.get( "#/profile", function( context ){
                page.view( self.data );
            });
        };

        return Profile;
    }
);
