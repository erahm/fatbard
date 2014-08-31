define(
    ["backbone", "underscore", "text!vw/chrome/navigation.html"],
    function( Backbone, _, NavTmpl ){
        var NavigationView = Backbone.View.extend({
            "template": _.template( NavTmpl ),

            "render": function(){
                this.$el.html( this.template() );
                return this;
            },

            "initialize": function(){
                this.render();
            }
        });

        return NavigationView;
    }
);
