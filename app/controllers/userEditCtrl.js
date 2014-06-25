
var userEditCtrl = function ($scope, $location, usernameService) {

	if (usernameService.username() === undefined || usernameService.username() === 'empty') {
		$location.path('/login');
	}

};

userEditCtrl.$inject = ['$scope', '$location', 'usernameService'];
