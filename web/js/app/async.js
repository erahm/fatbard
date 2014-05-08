define(
    ["jquery", "underscore", "containers/data"],
    function( $, _, DataStorage ){
        var Async = function(){},
            datStor = new DataStorage();

        Async.prototype.CASUAL_FRESHNESS_TOLERANCE      = (60 * 60 * 24 * 30);  // 30 days
        Async.prototype.DEFAULT_FRESHNESS_TOLERANCE     = (60 * 60 * 24 * 7);   // 7 days
        Async.prototype.STRICT_FRESHNESS_TOLERANCE      = (60 * 60 * 24);       // 1 day
        Async.prototype.SEVERE_FRESHNESS_TOLERANCE      = (60 * 60);            // 1 hour
        Async.prototype.NO_FRESHNESS_TOLERANCE          = 0;                    // 0 seconds

        Async.prototype.promise = function( content ){
            var dfd = new $.Deferred();
            dfd.resolve( content );
            return dfd.promise();
        };

        Async.prototype.ready = function( promise, callback ){
            $.when( promise ).done( callback );
        };

        Async.prototype.deferToCache = function( ajaxSettings, presenceKey, freshnessTolerance ){
            var stored,url,response;

            if( _( ajaxSettings ).has( "beforeSend" ) ){
                throw new Error("beforeSend is already set on the jQuery AJAX settings object. beforeSend must be available in order to defer to cached versions.");
            }
            else{
                ajaxSettings.beforeSend = function( x, settings ){
                    url     = this.url;
                    stored  = datStor.get( this.url );
                    if( !_.isEmpty( stored ) ){
                        return false;
                    }
                }

                response = $.ajax( ajaxSettings );

                if( !_.isEmpty( stored ) ){
                    response = this.promise( stored );
                }
                else{
                    $.when( response ).done( function( data ){
                        if( _( data ).has( presenceKey ) ){
                            datStor.set( url, data, freshnessTolerance );
                        }
                    });
                }

                return response;
            }
        };

        return Async;
    }
);
