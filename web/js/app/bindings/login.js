define(
    ["jquery"],
    function( $ ){
        var LoginBinding = {};

        LoginBinding.home = function(){
            $( 'button[type="submit"]' ).on( "click", function( e ){
                $( this ).trigger( "omakase.click.login.home.authenticate" );
                return false;
            });
        };

        return LoginBinding;
    }
);
