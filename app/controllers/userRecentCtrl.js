var userRecentCtrl = function ($scope, userCloudService) {

	userCloudService.getTagCloudData('user', 'recent', 'all', '6').then(function(d) {
		$scope.tagCloud = d.data;
	});

};

userRecentCtrl.$inject = ['$scope', 'userCloudService'];

var userRandomCtrl = function ($scope, userCloudService) {

	userCloudService.getTagCloudData('user', 'random', 'all', '6').then(function(d) {
		$scope.tagCloud = d.data;
	});

};

userRandomCtrl.$inject = ['$scope', 'userCloudService'];