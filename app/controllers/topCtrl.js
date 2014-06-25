var topCtrl = function ($scope, topService, $cookies) {

    $scope.top = topService.top;
    topService.gettopData();

    $scope.reverseIndex = function(index, length){
        return (length - index)+1;
    };

    //set cookie
    $cookies.currentTag = $scope.getPageTag();
};

topCtrl.$inject = ['$scope', 'topService', '$cookies'];

//reverse filter
/*
app.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});
*/