function Controller (cities, view) {
    this.cities = new Cities();
    this.view = new View();
    this.init();
}

Controller.prototype = function () {
    function _init () {
        $(document).on('newCity', _.bind(this.newCity, this));
        $(document).on('getSucceed', _.bind(this.updateCity, this));
        $(document).on('citiesChange', _.bind(this.updateView, this));
    }

    function _updateCity (event, eventData) {

    }

    function _updateView () {

    }

    function _newCity (event, eventData) {
        event.stopPropagation();

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
                    alert('Cannot get weather data. Error:' + error);
                });
        }
    }

    return {
        init: _init,
        newCity: _newCity,
        updateCity: _updateCity,
        updateView: _updateView
    };
}();
