 /* jshint -W117 */

app.service('data', ['$http', '$q', 'tagCloudService',  function($http, $q, tagCloudService) {
        
    var files = {};

    this.search = function(query) {

        var result = tagCloudService.getTagCloudData('tag','all', query, 'all').then(function(d) {
        
            var tagAll = d.data[0].tagCloud;

            var tagsArray = [];

            for(var i=0;i<tagAll.length;i++){
                tagsArray.push(tagAll[i].tag);
            }

            files = tagsArray;

            var items, deferred = $q.defer();

            items = _.chain(files)
            .filter(function(x) { return x.toLowerCase().indexOf(query.toLowerCase()) > -1; })
            .take(10)
            .value();

            deferred.resolve(items);
        
            return deferred.promise;
        });

        return result;
    };
}]);