var cities = (function () {
    var _cities = [];
    var _events = EventsHandler.getInstance();

    function _init (dbName) {
        this.load(dbName);
    }

    function _getCities () {
        return _cities;
    }

    function _addCity (cityData) {
        var city = JSON.parse(cityData);
        if (city) {
            _cities.push(city);
            _events.emit('citiesChanges', _cities);
        }
    }

    function _getCity(index) {
        return _cities[index];
    }

    function _removeCity(index) {
        var city =  _cities.splice(index, 1);
        if (city.length) _events.emit('citiesChanges', _cities);
    }

    // local storage
    function _save(name) {
        localStorage.setItem(name, JSON.stringify(_cities));
    }

    function _load(name) {
        var raw = localStorage.getItem(name);
        if (raw) {
            var data = JSON.parse(raw);
            if (data) _cities = data;
        }
    }

    return {
        getCities: _getCities,
        addCity: _addCity,
        getCity: _getCity,
        removeCity: _removeCity,
        load: _load,
        save: _save
    }
})();
