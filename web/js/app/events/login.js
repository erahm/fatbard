define(
    ["jquery", "transfer", "security"],
    function( $, Transfer, Security ){
        var LoginEvents = function(){},
            Transfer = new Transfer();

        LoginEvents.prototype.registerEvents = function(){
            this.registerHomeEvents();
        };

        LoginEvents.prototype.registerHomeEvents = function(){
            $( document ).on( "omakase.click.login.home.authenticate", function( e ){
                var clicked = e.target,
                    $clicked = $( clicked ),
                    credentials = {
                        "username": $clicked.siblings( '[name="username"]' ).val(),
                        "password": $clicked.siblings( '[name="password"]' ).val()
                    };

                $.when(
                    Transfer.requestAuthentication( credentials )
                )
                .done( function( data, stat, x ){
                    Security.logIn( data );
                    window.location = "/#/dashboard";
                })
                .fail( function( x, stat, t ){
                    console.log( x, stat, t );
                });
            });
        };

        return LoginEvents;
    }
);
