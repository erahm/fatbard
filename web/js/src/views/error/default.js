define(
    [
        // Libraries
        "backbone", "underscore",
        // Dependencies
        "text!vw/errors/default.html"
    ],
    function( Backbone, _, DefaultTmpl ){
        var DefaultErrorView = Backbone.View.extend({
            "template": _.template( DefaultTmpl ),

            "render": function(){
                this.$el.html( this.template({ "error": this.error, "route": this.route }) );
                return this;
            },

            "initialize": function( data ){
                this.error = data.error;
                this.route = data.route;
                this.render();
            }
        });

        return DefaultErrorView;
    }
);
