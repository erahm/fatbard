define(
    [
        // Libraries
        "backbone", "underscore",
        // Helpers
        "utilities",
        // Dependencies
        "bases/layout", "text!lyt/main.html", "views/chrome/sidebar"],
    function(
        Backbone, _,
        Utilities,
        Layout, LytTemplate, SidebarView
    ){
        var MainLayout = function( data ){
            Layout.call( this, data );

            _.extend( this.regions, {
                "content":  "#content",
                "sidebar":  "aside"
            });

            _.extend( this.parts, {
                "sidebar":   SidebarView
            });

            this.output = "#main";
            this.template = _.template( LytTemplate );
        };

        Utilities.extend( Layout, MainLayout );

        return MainLayout;
    }
);
