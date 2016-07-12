/**
 * City class
 */
function City (query, data) {
    this.query = query || '';
    this.data = data || null;
}

City.prototype = function () {
    function _valid (data) {
        return data.response && data.location && data.current_observation;
    }

    function _url () {
        return constants.url(this.query);
    }

    function _get () {
        var self = this;
        return $.ajax({
            url: this.url(),
            method: 'GET',
            dataType: 'jsonp',
        });
    }

    return {
        url: _url,
        get: _get,
        valid: _valid
    };
}();

/**
 * Collection of city
 */
function Cities (dbName) {
    this.dbName = dbName || 'simple-weather';
}

Cities.prototype = function () {
    var _cities = [];

    function _getCities () {
        return _cities;
    }

    function _isValidCity (city) {
        return city.data.response &&
               city.data.location &&
               city.data.current_observation &&
               !_isDuplicate(city);
    }

    function _isDuplicate (city) {
        _cities.forEach(function (aCity) {
            if (aCity.query === city.query) return true;
        });
        return false;
    }

    function _addCity (city) {
        if (_isValidCity(city)) {
            _cities.push(city);
            $(document).trigger('citiesChanged', [_cities]);
        }
    }

    function _getCity(index) {
        return _cities[index];
    }

    function _removeCity(index) {
        var city =  _cities.splice(index, 1);
        if (city.length) $(document).trigger('citiesChanged', [_cities]);
    }

    // local storage
    function _save () {
        localStorage.setItem(this.dbName, JSON.stringify(_cities));
    }

    function _load () {
        var raw = localStorage.getItem(this.dbName);
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
    };
}();
