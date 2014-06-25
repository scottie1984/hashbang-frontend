/* jshint -W079 */

var app = angular.module('app', [
    'ngRoute',
    'ui.bootstrap',
    'ngTagsInput',
    'angularFileUpload',
    'ui.gravatar',
	'ngCookies',
    'wu.masonry',
    'truncate',
    'ngAnimate'
])
    .config([
        '$routeProvider',
        '$locationProvider',
        'gravatarServiceProvider',
        
        function (
            $routeProvider,
            $locationProvider,
            gravatarServiceProvider
            ){

            $routeProvider
                .when('/',{
                    //redirectTo: '/rate/tag/cat', /* todo: make it go to a random tag or most popular? */
                    templateUrl: 'app/views/homepageView.html'
                    //controller: 'homepageCtrl'
                })
                .when('/random',{
                    //redirectTo: '/rate/tag/cat', /* todo: make it go to a random tag or most popular? */
                    templateUrl: 'app/views/homepageRandom.html'
                    //controller: 'homepageCtrl'
                })
                .when('/recent',{
                    //redirectTo: '/rate/tag/cat', /* todo: make it go to a random tag or most popular? */
                    templateUrl: 'app/views/homepageRecent.html'
                    //controller: 'homepageCtrl'
                })
                .when('/rate/:type/:tag/:id/:prevId',{
                    templateUrl: 'app/views/ratingView.html',
                    controller: 'ratingCtrl'
                })
                .when('/rate/:type/:tag',{
                    templateUrl: 'app/views/ratingView.html',
                    controller: 'ratingCtrl'
                })
                .when('/rate/:type/:tag/end/:prevId/:prevId',{
                    templateUrl: 'app/views/ratingEndView.html',
                    controller: 'endCtrl'
                })
                .when('/tagsearch',{
                    templateUrl: 'app/views/tagSearchView.html',
                    controller: 'tagSearchCtrl'
                })
                .when('/login',{
                    templateUrl: 'app/views/loginView.html',
                    controller: 'loginCtrl'
                })
                .when('/logout',{
                    templateUrl: 'app/views/uploadView.html',
                    controller: 'logoutCtrl'
                })
                .when('/signup',{
                    templateUrl: 'app/views/signupView.html',
                    controller: 'signupCtrl'
                })
                .when('/forgot/:token',{
                    templateUrl: 'app/views/forgotPassword.html',
                    controller: 'forgotPasswordCtrl'
                })
                .when('/forgot',{
                    templateUrl: 'app/views/forgotView.html',
                    controller: 'forgotCtrl'
                })
                .when('/upload',{
                    templateUrl: 'app/views/uploadView.html',
                    controller: 'fileUploadCtrl'
                })
                .when('/top/:type/:tag',{
                    templateUrl: 'app/views/topView.html',
                    controller: 'topCtrl'
                })
                .when('/:userName/uploads/:uploadId',{
                    templateUrl: 'app/views/userUploadsView.html',
                    controller: 'displayUploadCtrl'
                })
                .when('/:userName',{
                    templateUrl: 'app/views/userView.html',
                    controller: 'userCtrl'
                })
                .when('/:userName/edit',{
                    templateUrl: 'app/views/userEditView.html',
                    controller: 'userEditCtrl'
                })
                .when('/user/:token',{
                    templateUrl: 'app/views/activateView.html',
                    controller: 'activateCtrl'
                })
                .when('/croptest',{
                    templateUrl: 'app/views/testView.html',
                    controller: 'cropCtrl' //testing cropping
                })
                .when('/404',{
                    templateUrl: 'app/views/404View.html',
                    controller: 'errorCtrl'
                })
                .otherwise({'redirectTo': '/404'
                });

            $locationProvider
            .html5Mode(false)
            .hashPrefix('!');

            gravatarServiceProvider.defaults = {
                size     : 80,
                'default': 'mm'  // Mystery man as default for missing avatars
            };

            gravatarServiceProvider.secure = true;

        }
    ]);