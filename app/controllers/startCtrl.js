//random rate tag
var startRandomTagCtrl = function ($scope, startService) {
	startService.getRandomTagData('tag').then(function(d) {
		$scope.randomTag = d.data.random_tag;
	});

};
startRandomTagCtrl.$inject = ['$scope', 'startService'];

/*
var tabCtrl = function ($scope, startService) {
	
	if ($cookies.currentTag){

	}

};
tabCtrl.$inject = ['$scope', '$cookies'];*/