define(
    ["backbone", "underscore"],
    function( Backbone, _ ){
        var Layout = function( parts ){
            this.regions = {};
            this.parts = {};

            if( parts && parts instanceof Object ){
                var self = this;

                _( parts ).each( function( part, name, i ){
                    self.parts[ name ] = part;
                });
            }
        };

        Layout.prototype.build = function( data ){
            var def = {
                    "render": {},
                    "construct": {},
                    "sub": {}
                };

            data = _.extend( {}, def, data );

            var self = this;

            return Backbone.View.extend({
                "el": self.output,
                "template": self.template,

                "render": function(){
                    var isLayout, current, construct, pass, el;

                    this.$el.html( this.template( data.render ) );

                    _( self.parts ).each( function( part, name ){
                        el = {
                            "el": self.regions[ name ]
                        };

                        isLayout = part.prototype instanceof Layout;

                        construct = data.construct[ name ] ? data.construct[ name ] : {};
                        pass = data.sub[ name ] ? data.sub[ name ] : {};

                        if( !isLayout ){
                            construct = _.extend( {}, el, construct );
                        }

                        current = new part( construct );

                        if( isLayout ){
                            current.render( pass );
                        }
                    });

                    return this;
                },

                "initialize": function(){
                    this.render();
                }
            });
        };

        Layout.prototype.render = function( data ){
            return new (this.build( data ))();
        };

        return Layout;
    }
);
