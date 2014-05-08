define(
    ["jquery", "underscore", "async"],
    function( $, _, Async ){
        var Transfer = function(){};

        Transfer.prototype = new Async();

        Transfer.prototype.requestAuthentication = function( data ){
            var response = new $.Deferred();

            if( data.username == "test" && data.password == "test" ){
                response.resolve(JSON.stringify({
                    "user":{
                        "id":1,
                        "identity":"test",
                        "role":1,
                        "lastLogin":{
                            "date":"2014-02-19 10:23:58",
                            "timezone_type":3,
                            "timezone":"US\/Central"
                        },
                        "disabled":false,
                        "reset":false,
                        "verified":false
                    }
                }));
            }
            else{
                response.reject(JSON.stringify({
                    "message":"Credentials Unauthorized",
                    "content":{
                        "user":data.username,
                        "number":0
                    }
                }));
            }

            return response.promise();
        };

        return Transfer;
    }
);
