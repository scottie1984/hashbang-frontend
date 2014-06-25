/* jshint -W089 */
app.directive('ensureUnique', ['$http', 'configService', function($http, configService) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function() {
                var postData = {};
                postData[attrs.ngModel] = ele[0].value;
                $http({
                    method: 'POST',
                    url: configService.API_END_POINT+'auth/check/'+attrs.ensureUnique,
                    data: postData
                })
                .success(function(data, status) {
                    if (data.status === 'already in use'){
                        c.$setValidity('unique', false);
                    } else{
                        c.$setValidity('unique', true);
                    }
                });
            });
        }
    };
}]);