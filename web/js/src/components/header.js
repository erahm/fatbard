define(
    ["render", "bindings/header"],
    function( Render, Bindings ){
        var Header = function( data ){
            this.data = data;
            this.renderer = new Render( "content/header.html" );
        };

        Header.prototype.render = function(){
            this.renderer
                .generate( this.data )
                .output( "body > header" )
                .bind( Bindings.header );
        };

        return Header;
    }
);
