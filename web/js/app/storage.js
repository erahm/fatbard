define(
    ["underscore", "moment"],
    function( _, moment ){
        var Storage = function(){};

        Storage.prototype.parseNamespace = function( namespace ){
            var namespace = typeof namespace === "string" ? namespace.replace( /(^\.*)|(\.*$)/g, "") : namespace,
                parts;

            if( namespace === "" || typeof namespace !== "string" ){
                parts = [];
            }
            else{
                parts = namespace.split(".");

                if( parts[0] == "window" ){
                    parts = parts.slice( 1 );
                }
            }

            return parts;
        };

        // namespace function
        //adapted from http://addyosmani.com/blog/essential-js-namespacing/
        Storage.prototype.namespace = function( namespace ){
            var parent = window,
                pl, i, parts;

            parts = this.parseNamespace( namespace );

            pl = parts.length;
            for( i = 0; i < pl; i++ ){
                //create missing steps in the chain
                if( parent[parts[i]] === undefined ){
                    parent[parts[i]] = {};
                }

                parent = parent[parts[i]];
            }
        };

        Storage.prototype.resolve = function( path ){
            var parts = this.parseNamespace( path ),
                parent = window;

            _( parts ).each( function( key, i ){
                if( parent === undefined ){
                    parent = window[ key ];
                }
                else{
                    parent = parent[ key ];
                }
            });

            return parent;
        };

        Storage.prototype.set = function( path, key, val ){
            this.namespace( path );
            this.resolve( path )[ key ] = val;
        };

        Storage.prototype.get = function( path, key ){
            var location = this.resolve( path );
            if( location ){
                return location[ key ];
            }
            else{
                return location;
            }
        };

        return Storage;
    }
);
