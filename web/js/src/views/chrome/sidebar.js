define(
    ["backbone", "underscore", "text!vw/chrome/sidebar.html"],
    function( Backbone, _, SidebarTmpl ){
        var SidebarView = Backbone.View.extend({
            "template": _.template( SidebarTmpl ),

            "render": function(){
                this.$el.html( this.template() );
                return this;
            },

            "initialize": function(){
                this.render();
            }
        });

        return SidebarView;
    }
);
