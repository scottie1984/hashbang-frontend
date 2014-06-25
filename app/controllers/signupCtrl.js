/* jshint -W089 */

var signupCtrl = function ($scope, $location, $http, configService, $timeout, $anchorScroll) {

    $scope.passwordStrength = function() {
        var postData = {
            password: $scope.user.password
        };

        $http({
            method: 'POST',
            url: configService.API_END_POINT+'auth/check/password',
            data: postData
        })
        .success(function(data, status) {

            if(data.status === 'strong'){
                $scope.checkStrengthMessage = 'strong';
                $scope.strengthColor = 'success'; //green
                $scope.strengthValue = 100;
            }
            if(data.status === 'medium'){
                $scope.checkStrengthMessage = 'medium';
                $scope.strengthColor = 'warning'; //red
                $scope.strengthValue = 60;
            }
            if(data.status === 'weak'){
                $scope.checkStrengthMessage = 'weak';
                $scope.strengthColor = 'danger'; //orange
                $scope.strengthValue = 30;
            }
        });
    };


    $scope.processForm = function(isValid){
        if (isValid){
            
            console.log($scope.username);
            console.log($scope.email);
            console.log($scope.user.password);
            console.log($scope.user.passwordConfirm);

            var postData = {
                username: $scope.username,
                email: $scope.email,
                password: $scope.user.password,
                confirmPassword: $scope.user.passwordConfirm
            };
            
            $http({
                method  : 'POST',
                url     : configService.API_END_POINT+'auth/create',
                data: postData,
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                },
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
            .success(function(data) {
                //console.log(data.token);
                //usernameService.setUsername(data.username, data.id, data.token);
                console.log(data);

                if (data.status === 'Password not strong enough'){
                    $timeout(function() {
                        $scope.errorMessagePassword = '';
                    }, 3500);
                    $scope.errorMessagePassword = data.message;
                    
                } else if (data.status === 'ok' ){
                    $scope.signupMessage = 'Success! You have been sent an email with instructions on how to activate your account.';
                }

            })
            .error(function(data){
                //console.log('error '+data);
            });

        } else{
            $scope.submittedError = true;
            $anchorScroll('top');

        }

    };
};

signupCtrl.$inject = ['$scope', '$location', '$http', 'configService', '$timeout', '$anchorScroll'];
