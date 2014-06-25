
var userCtrl = function ($scope, $location, usernameService) {

	if (usernameService.username() === undefined || usernameService.username() === 'empty') {
		$location.path('/login');
	}

};

userCtrl.$inject = ['$scope', '$location', 'usernameService'];
