define(
    ["underscore", "jquery"],
    function( _, $){
        var Notification = function( options ){
                var defaults = {
                    "content": "Empty Notification Content",
                    "data": {},
                    "selector": "!@#$%^&*()",
                    "type": "notice"
                };

                this.settings = $.extend( true, {}, defaults, options );
            },
            wrap;

        Notification.prototype.setType = function( type ){
            this.settings.type = type;

            return this;
        };

        Notification.prototype.setContent = function( content ){
            this.settings.content = content;

            return this;
        };

        Notification.prototype.render = function( selector ){
            selector = selector || this.settings.selector;

            $( selector ).html( this.generate() );
        };

        Notification.prototype.generate = function( data ){
            data = data || this.settings.data;

            var templateF = _.template( this.settings.content );
            return wrap( templateF( data ), this.settings.type );
        };

        Notification.prototype.get = function(){
            return this.generate();
        };

        Notification.prototype.put = function(){
            this.render();
        };

        wrap = function( content, type ){
            var notice = $( "<div></div>" ),
                icon = "fa-comment-o";

            if( type !== "notice" ){
                type = type == "error" ? "danger" : type;

                switch( type ){
                    case "warn":
                        icon = "fa-exclamation";
                        break;
                    case "okay":
                        icon = "fa-check-circle";
                        break;
                    case "info":
                        icon = "fa-info-circle";
                        break;
                    case "danger":
                        icon = "fa-exclamation-triangle";
                        break;
                }

                type = "notice notice-" + type;
            }

            notice
            .addClass( type )
            .html( content )
            .prepend( "<i class=\"fa " + icon + "\"></i>" );

            return notice.wrap( "<div></div>" ).parent().html();
        };

        return Notification;
    }
);
