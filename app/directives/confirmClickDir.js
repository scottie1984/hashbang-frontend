app.directive('confirmClick', ['$q', 'dialogModal', function($q, dialogModal) {
    return {
        link: function (scope, element, attrs) {
            var ngClick = attrs.ngClick.replace('confirmClick()', 'true').replace('confirmClick(', 'confirmClick(true,');
            scope.confirmClick = function(msg) {
                if (msg===true) {
                    return true;
                }
                msg = msg || attrs.confirmClick || 'Are you sure you want to delete this?';
                dialogModal(msg).result.then(function() {
                    scope.$eval(ngClick);
                });
                return false;
            };
        }
    };
}]);