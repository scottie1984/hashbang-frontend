app.service('displayUploadService', ['$http', '$location', 'configService',  function($http, $location, configService) {
  
    var _displayUploadDataArr = [];

    var _getDisplayUploadData = function(){
    
        var tagId = $location.path().split('/')[3]||'Unknown';


        var url  = configService.API_END_POINT+'upload/'+tagId+'';
        //var url  = 'app/data/displayUpload.json';

        $http.get(url)
            .then(function(results){
                //Success
                console.log(results.data);
                angular.copy(JSON.parse('['+JSON.stringify(results.data)+']'), _displayUploadDataArr);

            }, function(results){
                //Error
        });
    };


    return{
        displayUpload:_displayUploadDataArr,
        getDisplayUploadData: _getDisplayUploadData
    };
   
}]);