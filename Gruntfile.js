module.exports = function( grunt ){
    grunt.initConfig({
        "pkg": {
            "name": "fatbard",
            "version": '0.1.0',
            "files": function(){
                var files = grunt.file.expand(
                    {
                        cwd: 'web/js/src/'
                    },
                    [
                        'events/*.js',
                        'routers/*.js',
                        'controllers/*.js',
                        'components/modals/*.js',
                        'components/modules/*.js'
                    ]
                ),
                newFiles = [];

                for( var i = 0; i < files.length; i++ ){
                    newFiles[ i ] = files[ i ].replace( ".js", "" );
                }

                return newFiles;
            }()
        },
        "bower": {
            "install":{
                "options":{
                    "layout": "byComponent",
                    "targetDir": "./web/vendor",
                    "verbose": true
                }
            }
        },
        "copy": {
            "main": {
                "files": [
                    {
                        "expand": true,
                        "src": ['**'],
                        "dest": 'web/js/build/',
                        "cwd": 'web/js/src/'
                    }
                ]
            }
        },
        "sass": {
            "dev": {
                "options": {
                    "style": 'expanded'
                },
                "files": {
                    "web/style/screen.min.css": "web/style/sass/screen.scss"
                }
            },
            "prod": {
                "options": {
                    "style": 'compressed'
                },
                "files": {
                    "web/style/screen.min.css": "web/style/sass/screen.scss"
                }
            }
        },
        "replace": {
            "app": {
                "src": ['web/index.html-preformat'],
                "dest": 'web/index.html',
                "replacements": [
                    {
                        "from": '@@@proj-application-start@@@',
                        "to": "<%= pkg.name %>"
                    }
                ]
            },
            "dev-app": {
                "src": ['web/index.html-preformat'],
                "dest": 'web/index.html',
                "replacements": [
                    {
                        "from": '@@@proj-application-start@@@',
                        "to": "bootstrap"
                    }
                ]
            },
            "dev": {
                "src": ['web/js/build/**/*.js'],
                "overwrite": true,
                "replacements": [
                    {
                        "from": '@@@proj-version-number@@@',
                        "to": "<%= pkg.version %>-development"
                    },
                    {
                        "from": '@@@proj-bust@@@',
                        "to": "v=" + (new Date()).getTime()
                    }
                ]
            },
            "staging": {
                "src": ['web/js/build/<%= pkg.name %>.js'],
                "overwrite": true,
                "replacements": [
                    {
                        "from": '@@@proj-version-number@@@',
                        "to": "<%= pkg.version %>-staging"
                    },
                    {
                        "from": '@@@proj-bust@@@',
                        "to": "v=" + (new Date()).getTime()
                    }
                ]
            },
            "production": {
                "src": ['web/js/build/<%= pkg.name %>.js'],
                "overwrite": true,
                "replacements": [
                    {
                        "from": '@@@proj-version-number@@@',
                        "to": "<%= pkg.version %>"
                    },
                    {
                        "from": '@@@proj-bust@@@',
                        "to": "v=<%= pkg.version %>"
                    }
                ]
            }
        },
        "uglify": {
            "proj": {
                "options": {
                    "banner": '/* <%= pkg.name %> --- <%= grunt.template.today("yyyy-mm-dd hh:MM:ss.l") %> */\n'
                },
                "files": {
                    'web/js/build/<%= pkg.name %>.js': ['web/js/build/<%= pkg.name %>.js']
                }
            },
            "dev-proj": {
                "options": {
                    "banner": '/* <%= pkg.name %> Development Build --- <%= grunt.template.today("yyyy-mm-dd hh:MM:ss.l") %> */\n'
                },
                "files": {
                    'web/js/build/<%= pkg.name %>.js': ['web/js/build/<%= pkg.name %>.js']
                }
            }
        },
        "watch": {
            "scripts": {
                "files": ['web/js/src/**/*.js', 'web/js/test/**/*.js', 'web/style/**/*.scss', 'Gruntfile.js', 'web/index.html-preformat'],
                "tasks": ['build']
            }
        },
        "requirejs":{
            "compile":{
                "options":{
                    "baseUrl": "web/js/src/",
                    "paths":{
                        "lib":          "../../vendor",

                        "jquery":       "empty:",
                        "sammy":        "../../vendor/sammy/lib/sammy",
                        "underscore":   "../../vendor/underscore/underscore",
                        "moment":       "../../vendor/moment/min/moment.min",
                        "cookies":      "../../vendor/cookies/src/cookies.min"
                    },
                    "shim": {
                        "sammy": {
                            "deps": ["jquery"]
                        }
                    },
                    "name": "bootstrap",
                    "include": '<%= pkg.files %>',
                    "out": "web/js/build/<%= pkg.name %>.js"
                }
            }
        }
    });

    grunt.registerTask( 'prepare', "Prepare directory structure for anything necessary", function(){
        grunt.file.delete( "./web/js/build" );
        grunt.file.mkdir( "./web/js/build" );
        grunt.file.mkdir( "./web/vendor" );
    });

    grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );

    grunt.loadNpmTasks( 'grunt-text-replace' );
    grunt.loadNpmTasks( 'grunt-bower-task' );

    grunt.registerTask( 'setup', ['prepare', 'bower:install', 'build'] );
    grunt.registerTask( 'replace-dev', ['replace:dev', 'replace:dev-app'] );
    grunt.registerTask( 'replace-staging', ['replace:staging', 'replace:app'] );
    grunt.registerTask( 'replace-prod', ['replace:production', 'replace:app'] );

    grunt.registerTask( 'build',
        [
            'copy',
            'replace-dev',
            'sass:dev'
        ]
    );

    grunt.registerTask( 'build-ugly',
        [
            'requirejs',
            'uglify:proj',
            'replace:dev',
            'replace:app',
            'sass:prod'
        ]
    );

    grunt.registerTask( 'staging',
        [
            'prepare',
            'bower:install',
            'requirejs',
            'uglify:dev-proj',
            'replace-staging',
            'sass:prod'
        ]
    );

    grunt.registerTask( 'production',
        [
            'prepare',
            'bower:install',
            'requirejs',
            'uglify:proj',
            'replace-prod',
            'sass:prod'
        ]
    );

    grunt.registerTask( 'default',
        [
            'prepare',
            'build',
            'watch'
        ]
    );
};
