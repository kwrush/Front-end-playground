function Controller (cities, view) {
    this.cities = new Cities();
    this.view = new View();
    this.init();
}

Controller.prototype = function () {
    function _init () {
        $(document).on('newCity', _.bind(this.newCity, this));
        $(document).on('getSucceed', _.bind(this.updateCityView, this));
        $(document).on('cityAdded', _.bind(this.updateCitiesView, this));
        $(document).on('cityRemoved', _.bind(this.updateCitiesView, this));
    }

    // Update individual city's view
    function _updateCityView (event, eventData) {

    }

    function _updateView (event, eventData) {

    }

    // append or remove city view block
    function _updateCitiesView (event, eventData) {
        event.preventDefault();
        var self = this;
        var $cityView = this.view.getCityView(eventData.query);
        if (event.type === 'cityAdded') {
            var city = eventData;
            var icons = constants.icons(city.isDay());
            var viewData = {
                data: city.getData(),
                icons: icons
            };
            this.view.renderCityViwe($cityView, viewData);
        } else if (event.type === 'cityRemoved') {
            $cityView.remove();
        }
    }

    function _newCity (event, eventData) {
        event.preventDefault();
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
        updateView: _updateView,
        updateCityView: _updateCityView,
        updateCitiesView: _updateCitiesView
    };
}();
