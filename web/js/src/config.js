define(
    ["module"],
    function( module ){
        var Config = module.config();

        window.fatbard = window.fatbard || {};
        window.fatbard.config = Config;

        return Config;
    }
);
