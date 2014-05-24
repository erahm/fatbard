define(
    [ "security", "objects/user" ],
    function( Security, User ){
        var RouterBase = function(){
                this.dmz = true;
                this.blacklist = [];
                this.whitelist = [];
            },
            User = new User(),
            recursiveObjectMerge;

        RouterBase.prototype.controllerRequiresAuthentication = function(){
            return this.dmz;
        };

        RouterBase.prototype.actionRequiresAuthentication = function( action ){
            if( this.dmz ){
                return _( this.blacklist ).has( action );
            }
            else{
                return !_( this.whitelist ).has( action );
            }
        };

        RouterBase.prototype.filter = function( allow, disallow, action ){
            var self = this,
                populate = function(){
                    var user = User.getAuthentication();

                    self.data = self.extend( self.data, { "application": { user: user } } );
                };

            allow       = allow     || function(){};
            disallow    = disallow  || function(){};
            action      = action    || "----------";

            populate();

            if( this.controllerRequiresAuthentication() ){
                if( this.actionRequiresAuthentication( action ) ){
                    return allow();
                }
                else{
                    return Security.userIsAuthenticated() ? allow() : disallow();
                }
            }
            else{
                if( this.actionRequiresAuthentication( action ) ){
                    return Security.userIsAuthenticated() ? allow() : disallow();
                }
                else{
                    return allow();
                }
            }
        };

        RouterBase.prototype.extend = function( one, two ){
            return recursiveObjectMerge( recursiveObjectMerge( {}, one ), two );
        };

        /****** Helpers ******/
        function recursiveObjectMerge( primary, overwrite ){
            var p;
            for( p in overwrite ){
                try{
                    //try an update
                    if( overwrite[p].constructor == Object ){
                        if (typeof primary[p] == "undefined" || primary[p] === null) {
                            primary[p] = {};
                        }

                        primary[p] = recursiveObjectMerge( primary[p], overwrite[p] );
                    }
                    else{
                        primary[p] = overwrite[p];
                    }
                }
                catch( e ){
                    // destination doesn't have that property, create and set it
                    primary[p] = overwrite[p];
                }
            }

            // primary is modified (it's a reference), but pass it back
            // to keep up the idea that this function returns a result
            return primary;
        }

        return RouterBase;
    }
);
