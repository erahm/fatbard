define(
    ["routers/base", "controllers/login"],
    function( Base, Controller ){
        var Login = function( data ){
                this.data = data;
                this.dmz = true;
                this.blacklist = [ "home" ];
            },
            page = new Controller();

        Login.prototype = new Base();

        Login.prototype.register = function(){
            this.registerHome( this.data );
        };

        Login.prototype.registerHome = function( data ){
            var self = this;

            data.sammy.before( "#/", function( context ){
                return self.filter(
                    function(){
                        context.redirect( "#/dashboard/" );
                        return false;
                    },
                    undefined,
                    "home"
                );
            });

            data.sammy.get( "#/", function( context ){
                page.home( data );
            });
        };

        return Login;
    }
);
