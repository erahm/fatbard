requirejs.config({
    "urlArgs": "_=" + (new Date()).getTime(),
    "paths": {
        // SHORTCUTS
        "vw":                   "../../content/templates/views",
        "lyt":                  "../../content/templates/layouts",
        "slug":                 "../../content/slugs",

        // LIBRARIES
        "backbone":             "../../vendor/backbone/backbone",
        "underscore":           "../../vendor/underscore/underscore",
        "sammy":                "../../vendor/sammy/sammy",
        "jquery":               ["//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery", "../../vendor/jquery/jquery"],

        // LIBRARY PLUGINS
        "text":                 "../../vendor/requirejs-text/text",
        "localstorage":         "../../vendor/backbone.localstorage/backbone.localStorage"
    },
    "shim": {
        "backbone": {
            "exports": "Backbone"
        },
        "underscore": {
            "exports": "_"
        }
    }
});

window.fatbard = {
    "channels": {}
};

require(
    ["routes"],
    function( Routes ){
        Routes.startup();
    }
);
