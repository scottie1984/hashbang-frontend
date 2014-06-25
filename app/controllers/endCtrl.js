/* jshint -W089 */
var endCtrl = function ($scope, $location, $http, endService, configService) {

    endService.getRatingData().then(function(d) {
        $scope.ratings = d.data;
    });

};

endCtrl.$inject = ['$scope', '$location', '$http', 'endService', 'configService'];
