define(
    ["router", "event"],
    function( Router, Events ){
        var Init = {};

        Init.startApp = function(){
            Router.start();
            Events.startup();
        };

        return Init;
    }
);
