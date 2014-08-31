requirejs.config({
    "urlArgs": "_=" + (new Date()).getTime(),
    "paths":{
        "lib":          "../../vendor",

        "jquery":       ["//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min", "../../vendor/jquery/jquery.min"],
        "sammy":        "../../vendor/sammy/sammy",
        "underscore":   "../../vendor/underscore/underscore",
        "moment":       "../../vendor/moment/moment",
        "cookies":      "../../vendor/cookies/src/cookies.min"
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

require(
    ["jquery", "init", "config"],
    function( $, Init ){
        $(function(){
            Init.startApp();
        });
    }
);
