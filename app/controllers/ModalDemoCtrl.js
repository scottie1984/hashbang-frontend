/* jshint -W083 */
/* jshint -W062 */
/* jshint -W065 */

var ModalDemoCtrl = function ($scope, $modal, $log, $rootScope) {

    $scope.items = $scope.selectedFiles[0];

    var fileReader = new FileReader();
    fileReader.readAsDataURL($scope.items);
    var loadFile = function(fileReader) {
        fileReader.onload = function(e) {
            $rootScope.itemsimage = e.target.result;
        };
    }(fileReader);


    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
};
ModalDemoCtrl.$inject = ['$scope', '$modal', '$log', '$rootScope'];
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance) {



    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

ModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];