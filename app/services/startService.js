app.service('startService', ['$http', '$location','configService',  function($http, $location, configService) {
  
    var _randomTagDataArr = [];

    return{
        randomTag: _randomTagDataArr,
        getRandomTagData: function(type){
            var theurl  = configService.API_END_POINT+ '/tag/start/'+type;
             
            var result = $http({method: 'GET', url: theurl})
            .success(function(results){
                return results;
            });
            return result;
        }
    };
   
}]);