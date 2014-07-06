var displayUploadCtrl = function ($scope, displayUploadService) {

	$scope.displayUpload = displayUploadService.displayUpload;
	displayUploadService.getDisplayUploadData();
};

displayUploadCtrl.$inject = ['$scope', 'displayUploadService'];

//reverse filter
app.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});
