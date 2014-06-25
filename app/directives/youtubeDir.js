app.directive('youtube', ['$sce', function($sce) {
    return {
        restrict: 'EA',
        scope: { code:'@code' },
        replace: true,
        template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
        link: function (scope) {
            //console.log('here');
            scope.$watch('code', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + newVal);
                }
            });
        }
    };
}]);

/* TODO: switch image/video depenging on type
app.directive('youtube', ['$sce', function($sce) {
    return {
        restrict: 'EA',
        scope: { source:'@source' },
        replace: true,
        template: function(type){
            if (type === 'image/jpeg'||type === 'image/jpg'||type === 'image/gif'||type === 'image/png'){
                return '<img alt="" ng-src="{{value.file_name}}" class="img-rounded topimg img-responsive" ng-show="key.current.type === 'image/jpeg' || key.current.type === 'image/jpg' || key.current.type === 'image/gif' || key.current.type === 'image/png'">';
            } else if (type === 'video'){
                return '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>';
            }
        },
        link: function (scope, type) {
            //console.log('here');
            scope.$watch('source', function (newVal, type) {
                if (newVal && type === 'image/jpeg'||type === 'image/jpg'||type === 'image/gif'||type === 'image/png') {
                    scope.url = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + newVal);
                } else if (newVal && type === 'image/jpeg'||type === 'image/jpg'||type === 'image/gif'||type === 'image/png') {                                
                    scope.url = $sce.trustAsResourceUrl(newVal);
                }
            });
        }
    };
}]);
*/