/* jshint -W089 */

app.service('ratingService', ['$http', '$location', 'configService', function($http, $location, configService) {
  
    var _ratingDataArr = [];
	
	var ignore_ids = [];

    
    return{
        ratings: _ratingDataArr,
        getRatingData: function(){

            var pageTag,
            pageId,
            prevId,
            tagType;
            
            if($location.path().split('/')[1] === 'video'){
                tagType = $location.path().split('/')[3]||'Unknown';
                pageTag = $location.path().split('/')[4]||'Unknown';
                pageId  = $location.path().split('/')[5]||'Unknown';
                prevId  = $location.path().split('/')[6]||'Unknown';
            } else{
                tagType = $location.path().split('/')[2]||'Unknown';
                pageTag = $location.path().split('/')[3]||'Unknown';
                pageId  = $location.path().split('/')[4]||'Unknown';
                prevId  = $location.path().split('/')[5]||'Unknown';

            }

            var url  = configService.API_END_POINT+'tag/';
            
            var urlWithCurrentAndPrev = url + tagType + '/' + pageTag;
            
            if (pageId !== 'Unknown') {
                urlWithCurrentAndPrev = urlWithCurrentAndPrev + '/' + pageId;
                if (ignore_ids.indexOf(pageId) === -1) {
                    ignore_ids.push(pageId);
                }
            }
            
            if (prevId !== 'Unknown') {
                urlWithCurrentAndPrev = urlWithCurrentAndPrev + '/' + prevId;
                if (ignore_ids.indexOf(prevId) === -1) {
                    ignore_ids.push(prevId);
                }
            }
                
            
            //console.log(urlWithCurrentAndPrev);

            var result = $http({
                method  : 'POST',
                url     : urlWithCurrentAndPrev,
                data: {'ignoreIds': ignore_ids},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                },
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
            .error(function(results){
                //Error
                $location.path( '/top/' + pageTag );
            })
            .success(function(results){
                //Success
                //angular.copy(results.data, _ratingDataArr);
                return results;
            });
            
        
            return result;
        }
    };
    
   
}]);