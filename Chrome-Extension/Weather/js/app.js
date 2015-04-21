angular.module('weatherApp', [])
.controller('MainCtrl', function($scope, $timeout) {
        
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
    
    //hardcode Amsterdam just for now
    Weather.getWeatherForecast('NL/Amsterdam')
    .then(function(data) {
        $scope.weather.forecast = data;
    });
});

angular.module('weatherApp', [])
.provider('Weather', function() {
    var apiKey = '';
    
    this.setApiKey = function(key) {
        if (key) this.apiKey = key;
    };
    
    this.$get = function($http) {
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

.config(function(WeatherProvider) {
    WeatherProvider.setApiKey('c9914a3fccc20133');
})
