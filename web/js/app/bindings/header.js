define(
    ["jquery"],
    function( $ ){
        var HeaderBinding = {};

        HeaderBinding.header = function(){
            $( '#logo-container' ).on( "click", function( e ){
                $( this ).trigger( "omakase.click.header.logo" );
                return false;
            });
        };

        return HeaderBinding;
    }
);
