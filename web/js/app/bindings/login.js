define(
    ["jquery"],
    function( $ ){
        var LoginBinding = {};

        LoginBinding.home = function(){
            $( 'button[type="submit"]' ).on( "click", function( e ){
                $( this ).trigger( "fatbard.click.login.home.authenticate" );
                return false;
            });
        };

        return LoginBinding;
    }
);
