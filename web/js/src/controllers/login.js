define(
    ["page", "bindings/login"],
    function( Page, Bindings ){
        var Login = function(){
            this.root = "body > article div#main";
        };

        Login.prototype = new Page();

        Login.prototype.home = function( data ){
            this.data = data;

            this.render({
                "title": "Log In",
                "node": this.root,
                "mechanism": "output",
                "template": "content/login/home.html",
                "data": {},
                "bind": Bindings.home
            });
        };

        Login.prototype.enroll = function( data ){
            this.data = data;

            this.render({
                "title": "Create Your Account",
                "node": this.root,
                "mechanism": "output",
                "template": "content/login/enroll.html",
                "data": {},
                "bind": Bindings.enroll
            });
        };

        return Login;
    }
);
