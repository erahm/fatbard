define(
    ["page"],
    function( Page ){
        var Error = function(){
            this.root = "body div#main";
        };

        Error.prototype = new Page();

        Error.prototype.default = function( data ){
            this.data = data;

            this.render({
                "title": data.title,
                "node": this.root,
                "mechanism": "output",
                "template": "content/error/default.html",
                "data": data.template,
                "bind": function(){}
            });
        };

        return Error;
    }
);
