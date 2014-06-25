app.service('topService', ['$http', '$location', 'configService', function($http, $location, configService) {
  
    var _topDataArr = [];

    var _gettopData = function(){
		
		var pageTag = $location.path().split('/')[3]||'Unknown';

        var url  = configService.API_END_POINT+ 'leaderboard/' + pageTag + '/20';
        //var url  = 'app/data/top.json';


        $http.get(url)
            .then(function(results){
                //Success
                angular.copy(results.data, _topDataArr);
            }, function(results){
                //Error
        });
    };


    return{
        top: _topDataArr,
        gettopData: _gettopData
    };
   
}]);