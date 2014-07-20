'use strict';
module.exports = function(grunt) {

    var path = require('path');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        compass: {

            production: {
                options: {
                    sassDir: 'app/assets/sass',
                    cssDir: 'app/public/css/',
                    imagesDir: 'app/public/img',
                    httpImagesPath: '/images/',
                    specify: 'app/assets/sass/style.scss',
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
                dest: 'app/public/js/app.js'
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
                'app/public/js/app.js'
                ]
        },

        uglify: {
            core: {
                files: {
                    'app/public/js/core.js' : [
                        //jquery
                        'app/assets/js/jquery/jquery-1.10.2.min.js',
                        'app/assets/js/jquery/jquery.Jcrop.min.js',
                        'app/assets/js/jquery/jquery.masonry.min.js',
                        //angular libs
                        'app/assets/js/lib/lodash.min.js',
                        'app/assets/js/file-upload/angular-file-upload-shim.min.js',
                        'app/assets/js/lib/angular.min.js',
                        //angular modules
						'app/assets/js/lib/cookies.js',
                        'app/assets/js/file-upload/angular-file-upload.min.js',
                        'app/assets/js/lib/angular-route.min.js',
                        'app/assets/js/lib/ng-sanitize.js',
                        'app/assets/js/lib/ng-tags-input.min.js',
                        'app/assets/js/lib/angular-gravatar.js',
                        'app/assets/js/lib/md5.js',
                        'app/assets/js/lib/imagesloaded.js',
                        'app/assets/js/lib/angular-masonry.js',
                        'app/assets/js/lib/angular-truncate.js',
                        'app/assets/js/lib/angular-animate.min.js',
						//angulatics modules
						'app/assets/js/lib/angulartics-ga.js',
						'app/assets/js/lib/angulartics.js',
                        //ui-bootstrap
                        'app/assets/js/ui-bootstrap/ui-bootstrap.js',
                        //flat ui
                        'app/assets/js/flat-ui/jquery-ui-1.10.3.custom.min.js',
                        'app/assets/js/flat-ui/jquery.placeholder.js',
                        'app/assets/js/flat-ui/flatui-checkbox.js',
                        'app/assets/js/flat-ui/flatui-radio.js'
                        ]
                }
            },
             app: {
                options:{
                     beautify: true
                },
                files: {
                    'app/public/js/app.js' : [
                        'app/public/js/app.js'
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
                        'app/assets/js/shim/html5shiv.js', 
                        'app/assets/js/shim/respond.min.js'
                        ], 
                        dest: 'app/public/js/', 
                        filter: 'isFile'
                    }]
            },
             images: {
                files: [{
                        expand: true, 
                        flatten: true, 
                        src: [
                        'app/assets/img/*'
                        ], 
                        dest: 'app/public/img/', 
                        filter: 'isFile'
                    }]
            },
             fonts: {
                files: [{
                        expand: true, 
                        flatten: true, 
                        src: [
                        'app/assets/fonts/*/*'
                        ], 
                        dest: 'app/public/fonts/', 
                        filter: 'isFile'
                    }]
            }                         
        },
        jasmine: {
            test: {
                src: 'app/tests/scripts/*.js',
                    options: {
                        vendor: [
                        'app/assets/js/jquery/jquery-1.10.2.min.js',
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
                    'app/assets/sass/*.scss',
                    'app/assets/sass/**/*.scss'
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
