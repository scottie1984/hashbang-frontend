var uploadsCtrl = function ($scope, uploadsService) {
	uploadsService.getUploadsData('image', 'popular', 'all', '12').then(function(d) {
		$scope.uploads = d.data;
	});
};
uploadsCtrl.$inject = ['$scope', 'uploadsService'];

var uploadsVideosCtrl = function ($scope, uploadsService) {
	uploadsService.getUploadsData('video', 'popular', 'all', '12').then(function(d) {
		$scope.uploadsVideo = d.data;
	});
};
uploadsVideosCtrl.$inject = ['$scope', 'uploadsService'];

var uploadsRandomCtrl = function ($scope, uploadsService) {
	uploadsService.getUploadsData('image', 'random', 'all', '12').then(function(d) {
		$scope.uploads = d.data;
	});
};
uploadsRandomCtrl.$inject = ['$scope', 'uploadsService'];

var uploadsRandomVideosCtrl = function ($scope, uploadsService) {
	uploadsService.getUploadsData('video', 'random', 'all', '12').then(function(d) {
		$scope.uploadsVideo = d.data;
	});
};
uploadsRandomVideosCtrl.$inject = ['$scope', 'uploadsService'];

var uploadsRecentCtrl = function ($scope, uploadsService) {
	uploadsService.getUploadsData('image', 'recent', 'all', '12').then(function(d) {
		$scope.uploads = d.data;
	});
};
uploadsRecentCtrl.$inject = ['$scope', 'uploadsService'];

var uploadsRecentVideosCtrl = function ($scope, uploadsService) {
	uploadsService.getUploadsData('video', 'recent', 'all', '12').then(function(d) {
		$scope.uploadsVideo = d.data;
	});
};
uploadsRecentVideosCtrl.$inject = ['$scope', 'uploadsService'];
