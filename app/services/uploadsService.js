app.service('uploadsService', ['$http', '$location','configService',  function($http, $location, configService) {
  
    var _uploadsDataArr = [];

    return {
        uploads: _uploadsDataArr,
        getUploadsData: function(type, mode, searchString, count){
        
            var theurl  = configService.API_END_POINT+ 'upload/'+type+'/'+mode+'/'+searchString+'/'+count+'';
             
            var result = $http({method: 'GET', url: theurl})
            .success(function(results){
                return results;
            });
            return result;
        }
    };
   
}]);