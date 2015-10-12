'use strict';

// Declare app level module which depends on filters, and services
evo.module('peApp', ['evo', 'evo.common.directives', 'peControllers', 'ngCookies', 'ngRoute']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
		templateUrl: 'hello',
        controller: 'MainController'
      }).otherwise({redirectTo: '/'})
	;
    $locationProvider.html5Mode(true);
}]);

'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
	.controller('MainController', ['$rootScope', '$scope', '$log', 'evoAPI', function($rootScope, $scope, $log, evoAPI) {

        $log.log('Loading web main controller');
        $scope.message = 'Hello world';
        var obj = {city: 'BARRE'};


        evoAPI.callFunction('getZipByCity', obj)
            .then(function(output){
            console.log(output);
             //   $scope.table.data = output.result;
        }, function(err)
            {
                console.log(err);
            });


		$scope.table = {
            options: {
                pagination: {
                    itemsPerPage: 20
                },
                height: "300px",
                columns: {
                    "_id": "string",
                    "city": "string",
                    "pop": "string",
                    "state": "string",
                    "edit": {
                        type: "button",
                        icon: "fa fa-pencil-square-o",
                        width: "50px",
                        textAlign: "center",
                        onClick: function (e, item, column, index) {
                            console.log("Clicked Edit")
                        },
                        "delete": {
                            type: "button",
                            icon: ["fa", "fa-trash"],
                            width: "60px",
                            textAlign: "center",
                            class: "btn-danger",
                            onclick: function (e, item, column, index) {
                                console.log("Clicked Delete")
                            }
                        }

                    }
                }
            },

            data: [{_id: "1231235", city: "23423", pop: "asdf", state: "asdkf"}]
        };

	}]);



