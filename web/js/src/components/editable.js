define(
    ["jquery", "underscore", "components/modal"],
    function( $, _, Modal ){
        var Editable = {};

        Editable.watch = function( elements ){
            _( elements ).each( function( node, i ){
                var ns = $( node ).data( "ns" );

                $( node )
                    .find( "i.fa-pencil" )
                        .first()
                        .on( "click", function(){
                            Editable.edit( node );
                        });
            });
        };

        Editable.edit = function( node ){
            var editModal = new Modal( "content/modals/edit-field.html" ),
                key = $( node ).find( ".editable-key > span" ).first();

            editModal.render({
                key: key.data( "key" ),
                name: key.text(),
                val: $( node ).find( ".editable-value > span" ).first().text()
            });
        };

        return Editable;
    }
);
