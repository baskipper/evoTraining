evo.module('evo.common.directives')
    .directive('loadingGlobal',[
        '$log',
        '$rootScope',
        'orderByFilter',
        'filterFilter',
        function($log,$rootScope,orderByFilter,filterFilter) {
            return {
                restrict: 'EA',
                templateUrl: 'loadingModalGlobal',
                controller: 'LoadingGlobalController'
            };
        }]);