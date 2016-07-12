function Controller (cities, view) {
    this.cities = new Cities();
    this.view = new View();
    this.init();
}

Controller.prototype = function () {
    function _init () {
        $(document).on('newCity', _.bind(this.newCity, this));
<<<<<<< HEAD
        $(document).on('getSucceed', _.bind(this.upateCityView, this));
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
        if (event.type === 'cityAdded') {


        } else if (event.type === 'cityRemoved') {

        }
    }

    // fires when we select a city from result list
    // TODO: use promise, first show spin loader, if get() success, add city view,
    // otherwise show alert and remove empty city view, finally remove loader
    function _newCity (event, eventData) {
        event.preventDefault();

        var self = this;
        if (event.type === 'newCity') {
            var city = new City(eventData);
            city.get()
                .success(function (response) {
                    if (city.valid(response)) {
                        city.data = response;
                        self.cities.addCity(city);
                    }
                }).fail(function (error) {
                    self.view.alert('Cannot get weather data. Error:' + error);
                });
        }
    }

    return {
        init: _init,
        newCity: _newCity,
        updateView: _updateView,
        updateCityView: _updateCityView,
        updateCitiesView: _updateCitiesView

}();
