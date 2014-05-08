define(
    ["module"],
    function( module ){
        var Config = module.config();

        window.omakase = window.omakase || {};
        window.omakase.config = Config;

        return Config;
    }
);
