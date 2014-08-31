define(
    [
        // Libraries
        "backbone", "underscore",
        // Dependencies
        "text!vw/main/home.html"
    ],
    function( Backbone, _, HomeTmpl ){
        var MainHomeView = Backbone.View.extend({
            "template": _.template( HomeTmpl ),

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
