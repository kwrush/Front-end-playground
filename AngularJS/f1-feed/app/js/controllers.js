angular
    .module('F1FeedApp.controllers', [])
    /* Drivers controller */
    .controller('driversController', function ($scope, ergastApiService) {
        $scope.nameFilter = null;
        $scope.driversList = [];

        $scope.searchFilter = function (driver) {
            var keyword = new RegExp($scope.nameFilter, 'i');
            return !$scope.nameFilter                    ||
                   keyword.test(driver.Driver.givenName) ||
                   keyword.test(driver.Driver.familyName);
        };

        ergastApiService
            .getDrivers()
            .success(function (response) {
                $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            });
    })
    /* Driver controller */
    .controller('driverController', function ($scope, $routeParams, ergastApiService) {
        $scope.id = $routeParams.id;
        $scope.races = [];
        $scope.driver = null;

        ergastApiService
            .getDriverDetails($scope.id)
            .success(function (response) {
                $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
            });

        ergastApiService
            .getDriverRaces($scope.id)
            .success(function (response) {
                $scope.races = response.MRData.RaceTable.Races;
            });
    });
