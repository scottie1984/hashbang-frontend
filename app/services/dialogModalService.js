/* jshint -W043 */

app.service('dialogModal', ['$modal', function($modal) {
    return function (message, title, okButton, cancelButton) {
        okButton = okButton===false ? false : (okButton || 'Confirm');
        cancelButton = cancelButton===false ? false : (cancelButton || 'Cancel');

        var ModalInstanceCtrl = function ($scope, $modalInstance, settings) {
            // add settings to scope
            angular.extend($scope, settings);
            // ok button clicked
            $scope.ok = function () {
                $modalInstance.close(true);
            };
          // cancel button clicked
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        ModalInstanceCtrl.$inject = ['$scope', '$modalInstance', 'settings'];

        // open modal and return the instance (which will resolve the promise on ok/cancel clicks)
        var modalInstance = $modal.open({
            template: '<div class="dialog-modal"><div class="modal-header" ng-show="modalTitle"><h3 class="modal-title">{{modalTitle}}</h3></div><div class="modal-body">{{modalBody}}</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()" ng-show="okButton">{{okButton}}</button><button class="btn btn-default" ng-click="cancel()" ng-show="cancelButton">{{cancelButton}}</button></div></div>',
            controller: ModalInstanceCtrl,
            resolve: {
                settings: function() {
                    return {
                        modalTitle: title,
                        modalBody: message,
                        okButton: okButton,
                        cancelButton: cancelButton
                    };
                }
            }
        });
        // return the modal instance
        return modalInstance;
    };
}]);