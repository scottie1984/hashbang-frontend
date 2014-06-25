/* jshint -W117 */
/* jshint -W065 */

var cropCtrl = function ($scope, $location, $window, $timeout) {
	
    
	$scope.selected = function(cords) {

		var scale;

		$scope.picWidth = cords.w;
		$scope.picHeight = cords.h;
		$scope.thumbSizeWidth = 150;
		$scope.thumbSizeHeight = 150;

		if ($scope.picWidth > $scope.thumbSizeWidth) {
			scale = ($scope.thumbSizeWidth / $scope.picWidth);
			$scope.picHeight *= scale;
			$scope.picWidth *= scale;
		}
		if($scope.picWidth < $scope.thumbSizeWidth){
			scale = ($scope.thumbSizeWidth * $scope.picWidth);
			$scope.picHeight *= scale;
			$scope.picWidth *= scale;
		}

		if ($scope.picHeight > $scope.thumbSizeHeight) {
			scale = ($scope.thumbSizeHeight / $scope.picHeight);
			$scope.picHeight *= scale;
			$scope.picWidth *= scale;
		}
		if($scope.picHeight < $scope.thumbSizeHeight){
			scale = ($scope.thumbSizeHeight * $scope.picHeight);
			$scope.picHeight *= scale;
			$scope.picWidth *= scale;
		}


		//console.log(cords);
		$scope.cropped=true;
		var rx = $scope.picWidth / cords.w;
		var ry = $scope.picHeight / cords.h;
		var imageObj = $window.jQuery('#preview')[0];

		$window.jQuery('img#preview').css({
			width: Math.round(rx * cords.bx) + 'px',
			height: Math.round(ry * cords.by) + 'px',
			marginLeft: '-' + Math.round(rx * cords.x) + 'px',
			marginTop: '-' + Math.round(ry * cords.y) + 'px'
		});
		
		//alert coordinates
		$scope.getCoordinates = function(){
			alert(JSON.stringify(cords));
		};
	};
	

};

cropCtrl.$inject = ['$scope', '$location', '$window', '$timeout'];