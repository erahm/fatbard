define(
    ["cookies"],
    function( Cookies ){
        var User = function(){};

        User.prototype.getAuthentication = function(){
            var auth = Cookies( "authentication" );

            if( auth ){
                return JSON.parse( auth );
            }
            else{
                return undefined;
            }
        };

        return User;
    }
);
