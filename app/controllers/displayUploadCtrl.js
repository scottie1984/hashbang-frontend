var displayUploadCtrl = function ($scope, displayUploadService) {

	$scope.displayUpload = displayUploadService.displayUpload;
	displayUploadService.getDisplayUploadData();
};

displayUploadCtrl.$inject = ['$scope', 'displayUploadService'];
