/* jshint -W089 */

var loginCtrl = function ($scope, $location, $http, configService, usernameService, $timeout, $anchorScroll, $cookies) {


    $scope.processForm = function(isValid){
        if (isValid){

            $http({
                method  : 'POST',
                url     : configService.API_END_POINT+'auth/login',
                data: {'username': $scope.username, 'password': $scope.password},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                },
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
            .success(function(data, status, headers, config) {

                if (data.status === 'Invalid username or password'){
                    $timeout(function() {
                        $scope.errorMessage = '';
                    }, 3500);
                    $scope.errorMessage = data.status;
                    $anchorScroll('top');
                    
                } else{
                    //console.log(data.token);
                    usernameService.setUsername(data.username, data.id, data.token);
                    //$location.path('/upload');
                    
                    //redirect to appropriate place
                    if ($scope.oldHash === '#!/upload'){
                        $location.path('/upload');
                    } else if (
                        $scope.oldHash === '#!/login'   ||
                        $scope.oldHash === '#!/logout'  ||
                        $scope.oldHash === '#!/signup'  ||
                        $scope.oldHash === '#!/forgot'  ||
                        $scope.oldHash === '#!/forgot/'+$cookies.forgotToken+''
                        ){
                        $location.path('/');
                    } else {
                        $location.path($scope.oldHash.replace('#!/','/'));
                    }
                }

            }).error(function(data) {
                $scope.errorMessage = data.status;
            });
    
        } else{
            //console.log('error');
            $scope.submittedError = true;
            $anchorScroll('top');

        }
    };


};

loginCtrl.$inject = ['$scope', '$location', '$http', 'configService', 'usernameService', '$timeout', '$anchorScroll', '$cookies'];
