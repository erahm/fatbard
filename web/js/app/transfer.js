define(
    ["jquery", "underscore", "async"],
    function( $, _, Async ){
        var Transfer = function(){};

        Transfer.prototype = new Async();

        Transfer.prototype.requestAuthentication = function( data ){
            var response = $.ajax({
                "url": "/api/authenticate/" + data.username,
                "type": "post",
                "data": {
                    "password": data.password
                }
            });

            return response;
        };

        Transfer.prototype.getUser = function( username ){
            var response = this.deferToCache({
                "url": "/api/user/" + username,
                "type": "get"
            }, "username", this.CASUAL_FRESHNESS_TOLERANCE );

            return response;
        };

        return Transfer;
    }
);
