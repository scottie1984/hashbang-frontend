app.directive('loading', ['$http', '$location', function($http, $location) {

    return {
        restrict: 'E',
        replace:true,
        template: '<p>Loading preview... <i class="fa fa-cog fa-spin" style="margin-top: 3em;"></i></p>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                    if (val){
                        $(element).show();
                    }
                    else{
                        $(element).hide();
                    }
                });
        }
    };

}]);