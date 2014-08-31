define(
    [
        // Libraries
        "sammy", "underscore",
        // Routers
        "routers/fatbard", "routers/login", //"routers/students",
        // Error Router
        "routers/errors"
    ],
    function(
        Sammy, _,
        FatbardRouter, LoginRouter, //StudentsRouter,
        ErrorRouter
    ){
        var Routes = {},
            fatbard = new Sammy();

        Routes.startup = function(){
            var routers = [
                    FatbardRouter,
                    LoginRouter,
                    /*StudentsRouter,*/
                    ErrorRouter
                ],
                count = 0;

            _( routers ).each( function( r, i ){
                ++count;
                r.register( fatbard );

                if( count === routers.length ){
                    fatbard.run( "#/" );
                }
            });
        };

        Routes.navigate = function( path ){
            location.href = path;
        };

        return Routes;
    }
);
