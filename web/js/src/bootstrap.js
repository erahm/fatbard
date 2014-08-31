requirejs.config({
    "urlArgs": "_=" + (new Date()).getTime(),
    "paths":{
        "lib":          "../../vendor",

        "jquery":       ["//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min", "../../vendor/jquery/jquery.min"],
        "sammy":        "../../vendor/sammy/sammy",
        "underscore":   "../../vendor/underscore/underscore",
        "moment":       "../../vendor/moment/moment",
        "cookies":      "../../vendor/cookies/src/cookies.min",
        "backbone":     "../../vendor/backbone/backbone"
    },
    "shim":{
        "sammy":{
            "deps": ["jquery"]
        }
    },
    "config":{
        "config":{
            "application":{
                "name": "Fatbard"
            },
            "routers":[
                "error",
                "login",
                "profile"
            ],
            "events":[
                "header",
                "login",
                "profile"
            ]
        }
    }
});

console.log( "before app" );
console.log( window );

require(
    ["jquery", "init", "config"],
    function( $, Init, Config ){
        console.log( "before doc ready" );
        console.log( window );
        console.log( Config );

        $(function(){
            console.log( "doc ready" );
            console.log( window );
            console.log( Config );
            Init.startApp();
        });
    }
);
