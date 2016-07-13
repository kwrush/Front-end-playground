function Controller (cities, view) {
    this.cities = new Cities();
    this.view = new View();
    this.init();
}

Controller.prototype = function () {
    function _init () {
        $(document).on('newCity', _.bind(this.newCity, this));
        $(document).on('updateView', _.bind(this.updateCityView, this));
        $(document).on('cityAdded', _.bind(this.updateCitiesView, this));
        $(document).on('cityRemoved', _.bind(this.updateCitiesView, this));
    }

    // Update individual city's view
    function _updateCityView (event, eventData) {
        var cityView = this.view.getCityView(eventData);
        this.view.startRefreshing(cityView);
        var self = this;
        var city = this.cities.getCity(0);
        _loadData(city).then(function (response) {
            city.setData(response);
            //self.cities.addCity(city);
        }).catch(function (error) {
            self.view.alert('Cannot get weather data, try again later.');
            // debug
            console.error(error.stack);
        }).then(function () {
            self.view.stopRefreshing();
        });
    }

    function _updateView (event, eventData) {

    }

    function _showData (cityView, city) {
        var data = city.getData();
        var icon = constants.icons(city.isDay())[data.current_observation.icon];
        var forecastIcons = constants.icons(true);
        var viewData = {
            data: city.getData(),
            icon: icon,
            forecastIcons: forecastIcons
        };
        this.view.renderCityViwe(cityView, viewData);
    }

    // append or remove city view block
    function _updateCitiesView (event, eventData) {
        event.preventDefault();
        var self = this;
        var $cityView = this.view.getCityView(eventData.query);
        if (event.type === 'cityAdded' || event.type === 'getSucceed') {
            this.showData($cityView, eventData);
        } else if (event.type === 'cityRemoved') {
            $cityView.remove();
        }
    }

    function _newCity (event, eventData) {
        event.preventDefault();
        event.stopPropagation();

        this.view.hideResults();

        var self = this;
        if (event.type === 'newCity') {
            this.view.addTrailingEmptyCityView(eventData);
            var city = new City(eventData);
            _loadData(city).then(function (response) {
                city.setData(response);
                self.cities.addCity(city);
            }).then(function () {
                self.view.stopRefreshing();
            }).catch(function (error) {
                self.view.alert('Error! Cannot add this city.');
                self.view.removeTrailingEmptyCityView();
                // debug
                console.error(error.stack);
            });
        }
    }

    // Load json data and return a promise
    function _loadData (city) {
        return new Promise (function (resolve, reject) {
            city.get().success(function (response) {
                resolve(response);
            }).fail(function (error) {
                reject(error);
            });
        });
    }

    return {
        init: _init,
        newCity: _newCity,
        showData: _showData,
        updateView: _updateView,
        updateCityView: _updateCityView,
        updateCitiesView: _updateCitiesView
    };
}();
