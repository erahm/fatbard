define(
    ["cookies", "objects/user"],
    function( Cookies, User ){
        var Security = {},
            User = new User();

        Security.logIn = function( authenticationResponse ){
            if( authenticationResponse ){
                Cookies( "authentication", JSON.stringify( authenticationResponse.user ) );
            }
            else{
                Cookies.expire( "authentication" );
            }
        };

        Security.logOut = function(){
            Cookies.expire( "authentication" );
            window.location = "/";
        };

        Security.userIsAuthenticated = function(){
            var auth = User.getAuthentication();

            if( auth && auth.username ){
                return true;
            }
            else{
                return false;
            }
        };

        return Security;
    }
);
