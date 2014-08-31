define(
    ["layouts/fatbard", "layouts/main", "views/main/home", "views/login/enroll"],
    function( FatbardLayout, MainLayout, LoginView, EnrollView ){
        var mod = {};

        mod.register = function( rtr ){
            rtr.get( /\/login(\/)?$/, function(){
                var layout = new FatbardLayout({"main": MainLayout});

                layout.render({
                    "construct": {
                        "main": {
                            "content": LoginView
                        }
                    }
                });
            });

            rtr.get( /\/login\/enroll(\/)?$/, function(){
                var layout = new FatbardLayout({"main": MainLayout});

                layout.render({
                    "construct": {
                        "main": {
                            "content": EnrollView
                        }
                    }
                });
            });
        };

        return mod;
    }
);
