'use strict';

evo.module('peControllers')
    .controller('LoadingGlobalController', ['$scope', 'events', 'evoBrowser', function ($scope, events, evoBrowser) {
        $scope.supportsCss3Animation = evoBrowser.supportsCSS3Animation();
        function isVisible(boo) {
            $scope.isLoading = boo;
        }

        $scope.bars = function (n) {
            var ret = [];
            for (var i = 0; i < n; ++i)
                ret.push(i);

            return ret;
        };

        $scope.$on(events.types.VIEW_LOADED, function () {
            isVisible(false);
        });

        $scope.$on(events.types.VIEW_LOADING, function () {
            isVisible(true);
        });
        $scope.$on('$routeChangeStart', function () {
            isVisible(true);
        });
    }]);