angular
    .module('F1FeedApp.services', [])
    .factory('ergastApiService', function ($http) {
        var ergastApi = {};
        ergastApi.getDrivers = function () {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/2015/driverStandings.json?callback=JSON_CALLBACK'
            });
        };

        ergastApi.getDriverDetails = function (id) {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/2015/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
            });
        };

        ergastApi.getDriverRaces = function (id) {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/2015/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'            });
        };

        return ergastApi;
    });
