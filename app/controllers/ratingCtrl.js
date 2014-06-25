/* jshint -W089 */


var ratingCtrl = function ($scope, $location, $http, ratingService, configService, commentService, $timeout, $window, usernameService, $q, $cookies) {

    ratingService.getRatingData().then(function(d) {
        $scope.ratings = d.data;
        //$scope.testing = d.data[0].next.type;
    });

    var tagName = $scope.getPageTag();
	var tagType = $scope.getPageType();

    $scope.getValue = function (value, prevId, currentId, nextId) {
        
        if (value !== 0) {
            $http({
                method  : 'POST',
                url     : configService.API_END_POINT+'rating/add',
                data: {'userId': '1', 'againstTag': tagName, 'objectId': currentId, 'score': value},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                },
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            });
        }

		if (nextId == null) {
            //alert('end');
			//$location.path('/top/'+tagName);
            $location.path('/rate/'+tagType+'/'+tagName+'/end/'+currentId+'/'+currentId);
		}
		else {
			$location.path('/rate/'+tagType+'/'+tagName+'/'+nextId+'/'+currentId);
		}
    };

    //set cookie
    $cookies.currentTag = $scope.getPageTag();

};

ratingCtrl.$inject = ['$scope', '$location', '$http', 'ratingService', 'configService', 'commentService', '$timeout', '$window', 'usernameService', '$q', '$cookies'];
