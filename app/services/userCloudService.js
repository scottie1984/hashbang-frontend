app.service('userCloudService', ['$http', '$location','configService',  function($http, $location, configService) {
  
    var _tagCloudDataArr = [];

    return{
        tagCloud: _tagCloudDataArr,
        getTagCloudData: function(type, mode, searchString, count){
            var theurl  = configService.API_END_POINT+ 'tag/'+type+'/'+mode+'/'+searchString+'/'+count+'';
             
            var result = $http({method: 'GET', url: theurl})
            .success(function(results){
                return results;
            });
            return result;
        }
    };
   
}]);