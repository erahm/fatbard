define(
    [
        // Libraries
        "backbone", "underscore",
        // Dependencies
        "text!vw/login/login.html", "bindings/login/login"
    ],
    function( Backbone, _, LoginTmpl, LoginBindings ){
        var MainHomeView = Backbone.View.extend({
            "template": _.template( LoginTmpl ),

            "events": LoginBindings,

            "render": function(){
                this.$el.html( this.template() );
                return this;
            },

            "initialize": function(){
                this.render();
            }
        });

        return MainHomeView;
    }
);
