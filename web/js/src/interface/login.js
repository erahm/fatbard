define(
    ["interface/baseUi"],
    function( Ui ){
        var LoginInterface = function(){};

        LoginInterface.prototype = new Ui();

        LoginInterface.prototype.showNotice = function(){
            var notice = new this.Notification({
                    "content": "Username or Password was incorrect.<br />Please check your entries and try again.",
                    "type": "error"
                }),
                domOb = $( notice.get() );

            $( "form" ).before( domOb );

            domOb.siblings( ".notice" ).remove();
        };

        return LoginInterface;
    }
);
