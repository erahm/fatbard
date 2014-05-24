define(
    ["jquery"],
    function( $ ){
        var LoginBinding = {};

        LoginBinding.home = function(){
            $( 'button[type="submit"]' ).on( "click", function( e ){
                $( this ).trigger( "fatbard.click.login/home/authenticate" );
                return false;
            });
        };

        LoginBinding.enroll = function(){
            $( 'button[type="submit"]' ).on( "click", function( e ){
                $( this ).trigger( "fatbard.click.login/enroll/create" );
                return false;
            });
        };

        return LoginBinding;
    }
);
