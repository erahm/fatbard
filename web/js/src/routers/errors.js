define(
    ["backbone", "layouts/fatbard", "layouts/main", "views/error/default"],
    function( Backbone, FatbardLayout, MainLayout, ErrorView ){
        var mod = {};

        mod.register = function( rtr ){
            rtr.get( /\/error\/(\d+)\/(.*)?$/, function(){
                var layout = new FatbardLayout({"main": MainLayout}),
                    self = this;

                layout.render({
                    "construct": {
                        "main": {
                            "content": ErrorView
                        }
                    },
                    "sub": {
                        "main": {
                            "construct": {
                                "content": {
                                    "error": self.params.splat[0],
                                    "route": self.params.splat[1]
                                }
                            }
                        }
                    }
                });
            });
        };

        return mod;
    }
);
