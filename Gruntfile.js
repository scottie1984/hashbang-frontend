'use strict';
module.exports = function(grunt) {

    var path = require('path');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        compass: {

            production: {
                options: {
                    sassDir: 'assets/sass',
                    cssDir: 'public/css/',
                    imagesDir: 'public/img',
                    httpImagesPath: '/images/',
                    specify: 'assets/sass/style.scss',
                    relativeAssets: true,
                    environment: 'development'
                    //environment: 'production'
                }
            }

        },

        concat: {
            dist: {
                src: [
                    //angular
                    'app/app.js', 
                    'app/controllers/*.js', 
                    'app/services/*.js',
                    'app/directives/*.js'
                ],
                dest: 'public/js/app.js'
            }
        },

        jshint: {
            options: grunt.file.readJSON('.jshintrc'),
            beforeconcat: [
                //angular
                'app/app.js', 
                'app/controllers/*.js', 
                'app/services/*.js',
                'app/directives/*.js'
                ],
            afterconcat: [
                'public/js/app.js'
                ]
        },

        uglify: {
            core: {
                files: {
                    'public/js/core.js' : [
                        //jquery
                        'assets/js/jquery/jquery-1.10.2.min.js',
                        'assets/js/jquery/jquery.Jcrop.min.js',
                        'assets/js/jquery/jquery.masonry.min.js',
                        //angular libs
                        'assets/js/lib/lodash.min.js',
                        'assets/js/file-upload/angular-file-upload-shim.min.js',
                        'assets/js/lib/angular.min.js',
                        //angular modules
						'assets/js/lib/cookies.js',
                        'assets/js/file-upload/angular-file-upload.min.js',
                        'assets/js/lib/angular-route.min.js',
                        'assets/js/lib/ng-sanitize.js',
                        'assets/js/lib/ng-tags-input.min.js',
                        'assets/js/lib/angular-gravatar.js',
                        'assets/js/lib/md5.js',
                        'assets/js/lib/imagesloaded.js',
                        'assets/js/lib/angular-masonry.js',
                        'assets/js/lib/angular-truncate.js',
                        'assets/js/lib/angular-animate.min.js',
                        //ui-bootstrap
                        'assets/js/ui-bootstrap/ui-bootstrap.js',
                        //flat ui
                        'assets/js/flat-ui/jquery-ui-1.10.3.custom.min.js',
                        'assets/js/flat-ui/jquery.placeholder.js',
                        'assets/js/flat-ui/flatui-checkbox.js',
                        'assets/js/flat-ui/flatui-radio.js'
                        ]
                }
            },
             app: {
                options:{
                     beautify: true
                },
                files: {
                    'public/js/app.js' : [
                        'public/js/app.js'
                    ]
                }
            }
        },

        copy: {
            jsfiles: {
                files: [{
                        expand: true, 
                        flatten: true, 
                        src: [
                        'assets/js/shim/html5shiv.js', 
                        'assets/js/shim/respond.min.js'
                        ], 
                        dest: 'public/js/', 
                        filter: 'isFile'
                    }]
            },
             images: {
                files: [{
                        expand: true, 
                        flatten: true, 
                        src: [
                        'assets/img/*'
                        ], 
                        dest: 'public/img/', 
                        filter: 'isFile'
                    }]
            },
             fonts: {
                files: [{
                        expand: true, 
                        flatten: true, 
                        src: [
                        'assets/fonts/*/*'
                        ], 
                        dest: 'public/fonts/', 
                        filter: 'isFile'
                    }]
            }                         
        },
        jasmine: {
            test: {
                src: 'app/tests/scripts/*.js',
                    options: {
                        vendor: [
                        'assets/js/jquery/jquery-1.10.2.min.js',
                        'app/tests/vendor/jasmine-jquery.js'
                        ],
                        specs: 'app/tests/specs/*.spec.js'
                }
            }
        },
         watch: {
            dev: {
                files: [
                    'app/*.js',
                    'app/controllers/*.js',
                    'app/services/*.js',
                    'app/directives/*.js',    
                    'app/tests/**/*.js',
                    'assets/sass/*.scss',
                    'assets/sass/**/*.scss'
                ],
                tasks: ['prod'],
                options: {
                    spawn: true
                }
            }
        }
 
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['prod']);


    grunt.registerTask(
        'prod',[
            'compass:production',
            'concat',
            'jshint', 
            'uglify',
            'copy',
            'jasmine'
            ]
    );
    
};
