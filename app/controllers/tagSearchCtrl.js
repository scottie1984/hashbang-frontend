var tagSearchCtrl = function ($scope, tagSearchService) {

	$scope.radioModel = 'all';
	
	if ($scope.query === '' || $scope.query === undefined){
		tagSearchService.getTagSearchData('tag','all', 'all', 'all').then(function(d) {
			$scope.tagCloud  = d.data;
		});
	} else{
		tagSearchService.getTagSearchData('tag', 'all', $scope.query, 'all').then(function(d) {
			$scope.tagCloud  = d.data;
		});
	}

	$scope.searchTags = function(mode, searchString, count){
		$scope.tagCloud = '';
		if(!searchString) {
			tagSearchService.getTagSearchData('tag', mode, 'all', 'all').then(function(d) {
				$scope.tagCloud  = d.data;
			});
		} else{
			tagSearchService.getTagSearchData('tag', mode, $scope.query, count).then(function(d) {
				$scope.tagCloud  = d.data;
			});
			document.getElementById('top-search').value = '';
		}
	
		//return tag list length 
		$scope.listLength = function(){
			return document.getElementsByClassName('tag-list').length;
		};
	};
};
tagSearchCtrl.$inject = ['$scope', 'tagSearchService'];
