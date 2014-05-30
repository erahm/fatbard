define(
    ["jquery", "components/editable"],
    function( $, Editable ){
        var ProfileBinding = {};

        ProfileBinding.view = function(){
            Editable.watch( $( ".editable" ) );
        };

        return ProfileBinding;
    }
);
