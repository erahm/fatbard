define(
    ["render"],
    function( Render ){
        var Modal = function( template ){
            this.renderer = new Render( template );
        };

        Modal.prototype.render = function( data ){
            this.renderer
                .generate( data )
                .addTo( "body" )
                .bind(function(){});
        };

        return Modal;
    }
);
