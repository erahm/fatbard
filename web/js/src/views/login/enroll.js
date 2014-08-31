define(
    [
        // Libraries
        "backbone", "underscore",
        // Dependencies
        "text!vw/login/enroll.html"
    ],
    function( Backbone, _, EnrollTmpl ){
        var LoginEnrollView = Backbone.View.extend({
            "template": _.template( EnrollTmpl ),

            "render": function(){
                this.$el.html( this.template() );
                return this;
            },

            "initialize": function(){
                this.render();
            }
        });

        return LoginEnrollView;
    }
);
