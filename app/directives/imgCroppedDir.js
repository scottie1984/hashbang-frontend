/* jshint -W117 */
/* jshint -W065 */


app.directive('imgCropped', ['$window', function($window) {
    var bounds = {};
    return {
        restrict: 'E',
        replace: true,
        scope: { src:'@', selected:'&' },
        link: function(scope, element, attr) {
            var myImg;
            var clear = function() {
                if (myImg) {
                    myImg.next().remove();
                    myImg.remove();
                    myImg = undefined;
                }
            };

            scope.$watch('src', function (nv) {
                clear();

                //console.log('[src]');
                //console.log(nv);
                if (!nv) { // newValue
                    return;
                }

                element.after('<img style="max-width: 100%;"/>');
                myImg = element.next();
                myImg.attr('src', nv);
                $window.jQuery(myImg).Jcrop({
                    trackDocument: true,
                    onSelect: function(cords) {
                        scope.$apply(function() {
                            cords.bx = bounds.x;
                            cords.by = bounds.y;
                            scope.selected({cords: cords});
                        });
                    },
                    onChange: function (cords) {
                        scope.$apply(function() {
                            cords.bx = bounds.x;
                            cords.by = bounds.y;
                            scope.selected({cords: cords});
                        });
                    },
                    aspectRatio: 1,
                    minSize: [ 80, 80 ]
                },
                function () {
                    // Use the API to get the real image size  
                    var boundsArr = this.getBounds();
                    bounds.x = boundsArr[0];
                    bounds.y = boundsArr[1];
                    //on load animate to center-ish
                    var animate = this.animateTo([162,72,385,295]);
                });



                
            });
                
            scope.$on('$destroy', clear);
        }
    };
}]);