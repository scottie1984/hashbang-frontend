/* jshint -W117 */
/* jshint -W065 */

var mainCtrl = function ($scope, $location, $http, $window, $cookies, $log, configService, usernameService, md5) {
	//email regex
	$scope.emailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	//generic get page
	$scope.getPage = function(page){
		return $location.path().split('/')[page];
	};
	//get 3rd path
	$scope.getPageTag = function() {
		return $location.path().split('/')[3]||'Unknown';
    };
	//get 2nd path
	$scope.getPageType = function() {
		return $location.path().split('/')[2]||'Unknown';
    };

    //watch current tag
	$scope.$watch(function(){
		return $cookies.currentTag;
	});
    $scope.getCurrentTag = function(){
		return $cookies.currentTag;
    };

	//redirect to search page
    $scope.searchQuery = function(topQuery){
		$scope.query = topQuery;
		$location.path('/tagsearch');
    };
    //clear top search
    $scope.searchClear = function(topQuery){
		if(topQuery.length === 0 ){
			$scope.topQuery = '';
			$scope.query = '';
		}
		//return tag list length 
		$scope.listLength = function(){
			return document.getElementsByClassName('tag-list').length;
		};
	};
	//ckeck if country code exists - if not go get it
	if (window.localStorage.getItem('CountryCode') !== null){
		$scope.countryCode = window.localStorage.getItem('CountryCode');
	} else{
		$http({method: 'GET', url: 'http://freegeoip.net/json/'})
		.success(function(data){
			window.localStorage.setItem('CountryCode', data.country_code);
			$scope.countryCode = window.localStorage.getItem('CountryCode');
		})
		.error(function(data) {
			// ok lets just set a value
			window.localStorage.setItem('CountryCode', 'us');
		});
	}

    //get user details
    $scope.getUserDetails = function (detail){
		$http({
			method: 'POST',
			data: {
				'userId': $cookies.id
			},
			url: configService.API_END_POINT+'auth/get/'+detail
		})
		.success(function(data){
			//set gravatar email
			$scope.gravatarEmail = md5(data.email);
		});
	};

	//watch for username cookie and show/hide if active
	$scope.$watch(function() { return $cookies.username;}, function() {
		usernameService.isActive().then(function(d) {
			if (d.data.active === true) {
				$scope.isUserLogged = $cookies.username;
				$scope.getUserDetails('email');
			}else{
				$scope.isUserLogged = null;
				$scope.gravatarEmail = null;
			}
		});
	});

	$scope.roundFontSize = function(v, minV , maxV) {
		var minFS = 120,	//minimum font size in %
		maxFS = 500,		//maximum font size in %
		size = 0;
		if (minV === maxV) {
			size = maxFS;
		}
		else {
			var multiplier = (maxFS-minFS)/(maxV-minV);
			size = minFS + ((maxV-(maxV-(v-minV)))*multiplier);
		}
		return Math.round(size);
		
	};
	$scope.roundTagColor = function(v, minV , maxV) {

		var roundSize = $scope.roundFontSize(v, minV , maxV);
		var color;

		if (roundSize > 100){
			color = 'tag1';
		}
		if (roundSize > 200){
			color = 'tag2';
		}
		if (roundSize > 300){
			color = 'tag3';
		}
		if (roundSize > 400){
			color = 'tag4';
		}

		return color;
	};
	$scope.roundTagSize = function(v, minV , maxV) {

		var roundSize = $scope.roundFontSize(v, minV , maxV);
		var size;

		if (roundSize > 100 ){
			size = 'tagSize1';
		}
		if (roundSize > 200){
			size = 'tagSize2';
		}
		if (roundSize > 300){
			size = 'tagSize3';
		}
		if (roundSize > 400 ){
			size = 'tagSize4';
		}

		return size;
	};
	$scope.imgSize = function(v, minV , maxV) {

		var roundSize = $scope.roundFontSize(v, minV , maxV);
		var size;

		if (roundSize > 100 ){
			size = 'img-size-sm';
		}
		if (roundSize > 200 ){
			size = 'img-size-m';
		}
		if (roundSize > 300 ){
			size = 'img-size-m2';
		}
		if (roundSize > 400 ){
			size = 'img-size-lg';
		}

		return size;
	};


};

mainCtrl.$inject = ['$scope', '$location', '$http', '$window', '$cookies','$log', 'configService', 'usernameService', 'md5'];