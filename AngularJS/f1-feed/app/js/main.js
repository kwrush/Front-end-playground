// Driver controller
angular
    .module('F1FeedApp.controllers', [])
    .controller('driversController', function ($scope, ergastApiService) {
        $scope.nameFilter = null;
        $scope.driversList = [];

        $scope.searchFilter = function (driver) {
            var keyword = new RegExp($scope.nameFilter, 'i');
            return !$scope.nameFilter || keyword.test(driver.Driver.givenName)
            || keyword.test(driver.Driver.familyName);
        };

        ergastApiService
            .getDrivers()
            .success(function (response) {
                $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            });
    });

// Ergast API service
angular
    .module('F1FeedApp.services', [])
    .factory('ergastApiService', function ($http) {
        var ergastApi = {};
        ergastApi.getDrivers = function () {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
            });
        }

        return ergastApi;
    });

// Main
angular
    .module('F1FeedApp', [
        'F1FeedApp.controllers',
        'F1FeedApp.services',
        'ngRoute'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/drivers', {
                templateUrl: 'partials/drivers.html',
                controller: 'driversController'
            })
            .when('/drivers/:id', {
                templateUrl: 'partials/driver.html',
                controller: 'driverController'
            })
            .otherwise({redirectTo: '/drivers'});
    }]);
