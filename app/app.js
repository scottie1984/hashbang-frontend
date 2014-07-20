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
    'ngAnimate',
	'angulartics',
	'angulartics.google.analytics'
])
    .config([
        '$routeProvider',
        '$locationProvider',
		'$analyticsProvider',
        'gravatarServiceProvider',
        
        function (
            $routeProvider,
            $locationProvider,
            gravatarServiceProvider
            ){

            $routeProvider
                .when('/',{
                    //redirectTo: '/rate/tag/cat', /* todo: make it go to a random tag or most popular? */
                    templateUrl: 'views/homepageView.html',
                    title: 'Home'
                    //controller: 'homepageCtrl'
                })
                .when('/404',{
                    templateUrl: 'views/404View.html',
                    controller: 'errorCtrl',
                    title: 'Page not found'
                })
                .when('/random',{
                    //redirectTo: '/rate/tag/cat', /* todo: make it go to a random tag or most popular? */
                    templateUrl: 'views/homepageRandom.html',
                    title: 'Random'
                    //controller: 'homepageCtrl'
                })
                .when('/recent',{
                    //redirectTo: '/rate/tag/cat', /* todo: make it go to a random tag or most popular? */
                    templateUrl: 'views/homepageRecent.html',
                    title: 'Recent'
                    //controller: 'homepageCtrl'
                })
                .when('/rate/:type/:tag/:id/:prevId',{
                    templateUrl: 'views/ratingView.html',
                    controller: 'ratingCtrl',
                    title: 'Rate'
                })
                .when('/rate/:type/:tag',{
                    templateUrl: 'views/ratingView.html',
                    controller: 'ratingCtrl',
                    title: 'Rate'
                })
                .when('/rate/:type/:tag/end/:prevId/:prevId',{
                    templateUrl: 'views/ratingEndView.html',
                    controller: 'endCtrl',
                    title: 'Rate'
                })
                .when('/tagsearch',{
                    templateUrl: 'views/tagSearchView.html',
                    controller: 'tagSearchCtrl',
                    title: 'Search'
                })
                .when('/login',{
                    templateUrl: 'views/loginView.html',
                    controller: 'loginCtrl',
                    title: 'Login'
                })
                .when('/logout',{
                    templateUrl: 'views/uploadView.html',
                    controller: 'logoutCtrl',
                    title: 'Logout'
                })
                .when('/feedback',{
                    templateUrl: 'views/feedbackView.html',
                    controller: 'feedbackCtrl',
                    title: 'Feedback'
                })
                .when('/signup',{
                    templateUrl: 'views/signupView.html',
                    controller: 'signupCtrl',
                    title: 'Sign up'
                })
                .when('/forgot/:token',{
                    templateUrl: 'views/forgotPassword.html',
                    controller: 'forgotPasswordCtrl',
                    title: 'Forgot'
                })
                .when('/forgot',{
                    templateUrl: 'views/forgotView.html',
                    controller: 'forgotCtrl',
                    title: 'Forgot'
                })
                .when('/upload',{
                    templateUrl: 'views/uploadView.html',
                    controller: 'fileUploadCtrl',
                    title: 'Upload'
                })
                .when('/top/:type/:tag',{
                    templateUrl: 'views/topView.html',
                    controller: 'topCtrl',
                    title: 'Top 20'
                })
                .when('/username/:userName/uploads/:uploadId',{
                    templateUrl: 'views/userUploadsView.html',
                    controller: 'displayUploadCtrl',
                    title: 'Upload'
                })
                .when('/username/:userName',{
                    templateUrl: 'views/userView.html',
                    controller: 'userCtrl',
                    title: 'My uploads'
                })
                .when('/username/:userName/edit',{
                    templateUrl: 'views/userEditView.html',
                    controller: 'userEditCtrl',
                    title: 'Edit my profile'
                })
                .when('/user/:token',{
                    templateUrl: 'views/activateView.html',
                    controller: 'activateCtrl',
                    title: 'Activate my account'
                })
                .when('/croptest',{
                    templateUrl: 'views/testView.html',
                    controller: 'cropCtrl' //testing cropping
                })
                .otherwise({'redirectTo': '/404'
                });

            $locationProvider.html5Mode(false);
            $locationProvider.hashPrefix('!');



            gravatarServiceProvider.defaults = {
                size     : 80,
                'default': 'mm'  // Mystery man as default for missing avatars
            };

            gravatarServiceProvider.secure = true;

        }
    ]);