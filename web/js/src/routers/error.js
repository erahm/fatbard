define(
    ["routers/base", "controllers/error"],
    function( Base, Controller ){
        var Error = function( data ){
                this.data = data;
                this.dmz = true;
            },
            page = new Controller();

        Error.prototype = new Base();

        Error.prototype.register = function(){
            var self = this;

            this.data.sammy.get('#/error/:error(/)?', function( context ){
                var data;

                switch( context.params.error ){
                    case "404":
                    default:
                        title = "Page Not Found";
                        break;
                }

                data = {
                    "title": title,
                    "params": context.params,
                    "template":{
                        attempt: context.params.triggeringLocation
                    }
                };

                // trigger the filter to check for authentication
                self.filter();

                data = self.extend( self.data, data );

                page.default( data );
            });
        };

        return Error;
    }
);
