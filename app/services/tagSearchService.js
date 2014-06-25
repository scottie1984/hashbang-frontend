app.service('tagSearchService', ['$http', '$location','configService',  function($http, $location, configService) {
  
    var _tagSearchDataArr = [];

    return{
        tagCloud: _tagSearchDataArr,
        getTagSearchData: function(type, mode, searchString, count){
        
            var theurl  = configService.API_END_POINT+ 'tag/'+type+'/'+mode+'/'+searchString+'/'+count+'';
            
            var result = $http({method: 'GET', url: theurl})
            .success(function(results){
                return results;
            });
            return result;
        }
    };
   
}]);