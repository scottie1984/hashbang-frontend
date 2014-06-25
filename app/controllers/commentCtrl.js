var commentCtrl = function ($scope, $location, $http, commentService, $timeout, $window, usernameService) {

    $scope.submitComment = function(isValid, prevId, currentId) {
        if (isValid){
            // save the comment. pass in comment data from the form
            // use the function we created in our service
            //console.log($scope.comment);
            commentService.save($scope.comment, currentId, usernameService.token())
            .success(function(data) {
                //$route.reload();

                
                $scope.userTag = data[0][1];
                $scope.userComment = data[0][2];
                $scope.userCommentTime = 'just now';
                
                $timeout(function() {
                    $scope.commentMessage = '';
                }, 3500);
                $scope.commentMessage = 'Your comment is submitted';
                
                //$window.jQuery('ul.comment').prepend('<li><div class="comment-avatar"><a href="#"><img src="http://www.gravatar.com/avatar/'+$scope.gravatarEmail+'?size=60&default=mm" class="profileThumb"></a></div><div class="comment-body"><div class="fa fa-play fa-flip-horizontal comment-triangle"></div><p>'+$scope.userComment+'</p></div><p class="comment-info pull-right"><a href="#">'+$scope.userTag+'</a> '+$scope.userCommentTime+'</p></li>').fadeIn('slow');

                $window.jQuery('ul.comment').prepend($('<li><div class="comment-avatar"><a href="#"><img src="http://www.gravatar.com/avatar/'+$scope.gravatarEmail+'?size=60&default=mm" class="profileThumb"></a></div><div class="comment-body"><div class="fa fa-play fa-flip-horizontal comment-triangle"></div><p>'+$scope.userComment+'</p></div><p class="comment-info pull-right"><a href="#">'+$scope.userTag+'</a> '+$scope.userCommentTime+'</p></li>').fadeIn('slow'));

                $scope.submittedError = false;

                $scope.comment = '';
                $scope.commentForm.$setPristine();
    
            })
            .error(function(data) {
                console.log(data);
            });

        } else{
            //console.log('error');
            $scope.submittedError = true;

        }
    };

};

commentCtrl.$inject = ['$scope', '$location', '$http', 'commentService', '$timeout', '$window', 'usernameService'];