angular
    .module('F1FeedApp', [
        'F1FeedApp.services',
        'F1FeedApp.controllers',
        'ngRoute'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/drivers', {
                templateUrl: 'app/partials/drivers.html',
                controllers: 'driversController'
            })
            .when('/drivers/:id', {
                templateUrl: 'app/partials/driver.html',
                controllers: 'driverController'
            })
            .otherwise({
                redirectTo: '/drivers'
            });
    }]);
