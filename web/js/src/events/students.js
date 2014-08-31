define(
    [
        // Libraries
        "backbone", "underscore", "jquery",
        // Dependencies
        "collections/seminars"
    ],
    function( Backbone, _, $, Seminars ){
        var vent = window.scheleton.channels.students || _.extend( {}, Backbone.Events ),
            seminars = new Seminars(),
            ENTER_KEY_CODE = 13;

        vent.on( "student:cancel", function(){
            location.href = "#/students";
        });

        vent.on( "add:student", function(){
            location.href = "#/student/new";
        });

        vent.on( "add:student:name", function( data ){
            var e = data.event,
                key = e.keyCode || e.which;
            data.student.setName( data.name );
            if( key == ENTER_KEY_CODE ){
                vent.trigger( "edit:student:save", {
                    "student": data.student
                });
            }
        });

        vent.on( "edit:student:seminar:autocomplete", function( data ){
            seminars.fetch();

            var e = data.event,
                input = $( e.target ),
                val = input.val(),
                matches = seminars.filter(function( seminar ){
                    var name = seminar.getName();

                    return name.toLowerCase().indexOf( val.toLowerCase() ) > -1;
                }),
                first;

            if( matches.length && val !== "" ){
                first = matches[0];

                input.data( "id", first.get( "id" ) );
                input.val( first.getName() );
            }
        });

        vent.on( "add:student:create", function( data ){
            data.student.save();
            vent.trigger( "student:cancel" );
        });

        vent.on( "edit:student", function( data ){
            location.href = "#/student/edit/" + data.id;
        });

        vent.on( "edit:student:save", function( data ){
            data.student.save();
            vent.trigger( "student:cancel" );
        });

        vent.on( "edit:student:delete", function( data ){
            var seminar;

            seminars.fetch();
            _( data.student.get( "seminars" ) ).each(function( seminarId, i ){
                seminar = seminars.get( seminarId );
                seminar.removeStudent( data.student );
            });
            data.student.destroy();
            vent.trigger( "student:cancel" );
        });

        vent.on( "edit:student:enroll", function( data ){
            var seminar;

            if( data.id ){
                seminars.fetch();
                seminar = seminars.get( data.id );

                if( !seminar.isStudentEnrolled( data.student ) ){
                    seminar.enrollStudent( data.student );
                    data.student.addSeminar( seminar );
                }
            }

            data.student.save();
        });

        window.scheleton.channels.students = vent;
        return vent;
    }
);
