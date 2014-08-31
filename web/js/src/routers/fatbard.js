define(
    [
        // Libraries
        "backbone",
        // Dependencies
        "layouts/fatbard", "layouts/main", "views/login/login"],
    function( Backbone, FatbardLayout, MainLayout, LoginView ){
        var mod = {};

        mod.register = function( rtr ){
            rtr.notFound = function(){
                location.href = "#/error/404/" + this.last_location[1];
            };

            rtr.get( /^\/$|^#$|^#\/$|^\/#\/$/, function(){
                var layout = new FatbardLayout({ "main": MainLayout }),
                    structure;

                layout.render({
                    "construct": {
                        "main": {
                            "content": LoginView
                        }
                    }
                });
            });
        };

        return mod;
    }
);
