define(
    ["jquery", "transfer", "security", "interface/login"],
    function( $, Transfer, Security, LoginUi ){
        var LoginEvents = function(){},
            Transfer = new Transfer(),
            Ui = new LoginUi(),
            bindingContext = $( document );

        LoginEvents.prototype.registerEvents = function(){
            this.registerHomeEvents();
            this.registerEnrollEvents();
        };

        LoginEvents.prototype.registerHomeEvents = function(){
            bindingContext.on( "fatbard.click.login/home/authenticate", function( e ){
                var clicked = e.target,
                    $clicked = $( clicked ),
                    credentials = {
                        "username": $clicked.siblings( '[name="username"]' ).val(),
                        "password": $clicked.siblings( '[name="password"]' ).val()
                    };

                $.when(
                    Transfer.requestAuthentication( credentials )
                )
                .done( function(){
                    $.when(
                        Transfer.getUser( credentials.username )
                    )
                    .done( function( data ){
                        Security.logIn( data );
                        window.location = "/#/dashboard";
                    });
                })
                .fail( function( x, stat, t ){
                    Ui.showNotice();
                });
            });
        };

        LoginEvents.prototype.registerEnrollEvents = function(){
            bindingContext.on( "fatbard.click.login/enroll/create", function( e ){
                var clicked = e.target,
                    $clicked = $( clicked ),
                    account = {
                        "username":     $clicked.siblings( '[name="username"]' ).val(),
                        "password":     $clicked.siblings( '[name="password"]' ).val(),
                        "email":        $clicked.siblings( '[name="email"]' ).val(),
                        "firstName":    $clicked.siblings( '[name="fname"]' ).val()
                    };

                $.when(
                    Transfer.registerAccount( account )
                )
                .done( function(){
                    $( clicked ).trigger( "fatbard.click.login/home/authenticate" );
                })
                .fail( function(){
                    console.log( "Couldn't create" );
                });
            });
        };

        return LoginEvents;
    }
);
