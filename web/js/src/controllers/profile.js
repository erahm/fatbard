define(
    ["page", "bindings/profile"],
    function( Page, Bindings ){
        var Profile = function(){
            this.root = "body > article div#main";
        };

        Profile.prototype = new Page();

        Profile.prototype.view = function( data ){
            this.data = data;

            this.render({
                "title": "My Profile",
                "node": this.root,
                "mechanism": "output",
                "template": "content/profile/view.html",
                "data": { "user": data.application.user },
                "bind": Bindings.view
            });
        };

        return Profile;
    }
);
