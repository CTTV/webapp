  /* Controllers */

    angular.module('cttvControllers', [])
    .run (['$rootScope', '$window', '$uibModalStack', function ($rootScope, $window, $uibModalStack) {
        'use strict';

        // Close all the modal windows when the route changes
        $rootScope.$on('$routeChangeSuccess', function (newVal, oldVal) {
            if (oldVal !== newVal) {
                $uibModalStack.dismissAll();
            }

            $rootScope.showApiErrorMsg = false;
            $rootScope.showApiError500 = false;
        });

        $rootScope.$on("cttvApiError", function (event, data) {
            if (data.status === 403) {
                $rootScope.showApiErrorMsg = true;
            }
        });
        $rootScope.reloadPage = function () {
            $window.location.reload();
        };
    }])

    .controller('MastheadCtrl', ['$scope', '$location', '$log', 'cttvLocationState', function ($scope, $location, $log, cttvLocationState) {
        'use strict';
        $log.log('MastheadCtrl()');
        $scope.location = $location;

    }])



    /**
     * Simple controller to expose the current page to the feedback button controller
     */
    .controller('FeedbackCtrl', ['$scope', '$location', '$log', 'cttvLocationState', function ($scope, $location, $log, cttvLocationState) {
        'use strict';
        // expose the location;
        // note that exposing the page as $location.absUrl() does not work as that would not update when URL changes
        $scope.location = $location;
        $scope.showSocialMedia = false;

        // perhaps we should use our locationstate service instead?
        $scope.$on('$locationChangeSuccess', function(){
            // when the location is back to the homepage, we hide the social media icons and show the "follow us" instead...
            if( $location.path()=='/' ){
                $scope.showSocialMedia = false;
            }
        });
    }]);
