define(
	[
		// Libraries
		"backbone", "underscore",
		// Helpers
		"utilities",
		// Dependencies
		"bases/layout", "text!lyt/fatbard.html", "views/chrome/navigation"],
	function( Backbone, _, Utilities, Layout, LytTemplate, NavView ){
		var FatbardLayout = function( data ){
			Layout.call( this, data );

			_.extend( this.regions, {
				"navigation":	"nav",
				"main":			"#main"
			});

			_.extend( this.parts, {
				"navigation":	NavView
			});

			this.output = "body";
			this.template = _.template( LytTemplate );
		};

		Utilities.extend( Layout, FatbardLayout );

		return FatbardLayout;
	}
);
