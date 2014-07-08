/* jshint -W089 */

var topCtrl = function ($scope, topService, $cookies) {

    $scope.top = topService.top;
    topService.gettopData();

    //set cookie
    $cookies.currentTag = $scope.getPageTag();
};

topCtrl.$inject = ['$scope', 'topService', '$cookies'];


var userUploadsListCtrl = function ($scope, userLeaderboardService, $cookies, usernameService, configService, $http) {

    $scope.top = userLeaderboardService.top;
    userLeaderboardService.gettopData();

    //delete frontend
    $scope.deleteItem = function(inx, id) {
        //reverse order
        var rev = $scope.top.length - (inx + 1);
        $scope.top.splice(rev, 1);
        //console.log(id, inx, rev);
        //console.log(usernameService.token());
        $http({
            method  : 'POST',
            url     : configService.API_END_POINT+'/upload/delete/' + id,
            data: {
                usertoken: usernameService.token()
            },
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
            //console.log(data);          
        });
        

    };

};

userUploadsListCtrl.$inject = ['$scope', 'userLeaderboardService', '$cookies', 'usernameService', 'configService', '$http'];


//reverse filter
app.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});

