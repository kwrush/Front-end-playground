angular.module('weatherApp', ['ngRoute'])
.provider('Weather', function() {
    var apiKey = '';
    
    this.setApiKey = function(key) {
        if (key) this.apiKey = key;
    };
    
    this.$get = function($q, $http) {
        var self = this;
        
        return {
            //service object
            getWeatherForecast: function(city) {
                var d = $q.defer();
                $http({
                    method: 'GET',
                    url: self.getUrl('forecast', city),
                    cache: true
                }).success(function(data) {
                    d.resolve(data.forecast.simpleforecast);
                }).error(function(err) {
                    d.reject(err);
                });
                
                return d.promise;
            }
        }
    };
    
    this.getUrl = function(type, ext) {
        return 'http://api.wunderground.com/api/' + 
            this.apiKey + '/' + type + '/q/' + 
            ext + '.json';
    };
})

.factory('UserService', function() {
    var defaults = {
        location: 'autoip'
    };
         
    var service = {
        user: {},
        
        save: function() {
            sessionStorage.presently = angular.toJson(service.user);
        },
        
        restore: function() {
            service.user = angular.fromJson(sessionStorage.presently) || defaults;
            
            return service.user;
        }
    };
    
    service.restore;
    
    return service;
})

.config(function(WeatherProvider) {
    WeatherProvider.setApiKey('c9914a3fccc20133');
})

.config(function($routeProvider) {
    $routeProvider.when (
        '/', {
            templateUrl: 'template/home.html',
            controller: 'MainCtrl'
        }
    )
    .when (
        '/settings', {
            templateUrl: 'template/settings.html',
            controller: 'SettingsCtrl'
        }
    )
    .otherwise ({redirectTo: '/'});
})

.controller('MainCtrl', function($scope, $timeout, Weather, UserService) {
        
    //build the date object
    $scope.date = {};
    
    //update function
    var updateTime = function() {
        $scope.date.raw = new Date();
        $timeout(updateTime, 1000);
    }
    
    // start update function
    updateTime();
    
    $scope.weather = {};
    
    $scope.user = UserService.user;
    
    //hardcode Amsterdam just for now
    Weather.getWeatherForecast($scope.user.location)
    .then(function(data) {
        $scope.weather.forecast = data;
    });
})

.controller('SettingsCtrl', function($scope, UserService) {
    $scope.user = UserService.user;
    
    $scope.save = function() {
        UserService.save();
    };
});
