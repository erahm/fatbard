define(
    ["underscore", "render", "components/header"],
    function( _, Render, Header ){
        var Page = function(){};

        Page.prototype.render = function( options ){
            var renderer = new Render( options.template );

            this.setTitle( options.title );
            this.renderHeader();

            renderer
                .generate( options.data );

            if( typeof options.mechanism === "string" ){
                renderer[ options.mechanism ]( options.node );
            }
            else{
                if( typeof options.mechanism === "function" ){
                    renderer.raw( options.mechanism );
                }
            }

            if( typeof options.bind === "function" ){
                renderer.bind( options.bind );
            }

            this.setTitle( options.title );
        };

        Page.prototype.setTitle = function( title ){
            var suffix = "Omakase";

            if( !title ){
                title = suffix;
            }
            else{
                title = title + " :: " + suffix;
            }

            document.title = title;
        };

        Page.prototype.renderHeader = function(){
            var data = this.data ? this.data.application || undefined : undefined,
                head = new Header( data );

            head.render();
        };

        return Page;
    }
);
