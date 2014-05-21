define(
    ["jquery", "interface/notification"],
    function( $, Notification ){
        var Ui = function(){};

        Ui.prototype.Notification = Notification;

        return Ui;
    }
);
