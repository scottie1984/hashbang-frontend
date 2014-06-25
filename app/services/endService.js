app.service('endService', ['$http', '$location', 'configService', function($http, $location, configService) {
  
    var _ratingDataArr = [];

    return{
        ratings: _ratingDataArr,
        getRatingData: function(type, string, prevId){

            type = $location.path().split('/')[2]||'Unknown';
            string = $location.path().split('/')[3]||'Unknown';
            prevId  = $location.path().split('/')[5]||'Unknown';

            var theurl  = configService.API_END_POINT+'/tag/end/'+type+'/'+string+'/'+prevId;
             
            var result = $http({method: 'GET', url: theurl})
            .success(function(results){
                return results;
            });
            return result;
        }
    };
   
}]);