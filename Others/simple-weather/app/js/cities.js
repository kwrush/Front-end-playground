/**
 * City class
 */
function City (query) {
    this.query = query || '';
}

City.prototype = function () {
    var day = 6;
    var night = 19;

    var _data = null;

    function _validate () {
        return this.query.length > 0 && this.isDataValid(_data);
    }

    function _isDataValid (data) {
        return data.response && data.forecast && data.current_observation;
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

    function _getLocalTime () {
        var epoch = _data.current_observation.local_epoch;
        return new Date(parseInt(epoch, 10) * 1000);
    }

    function _isDay () {
        var hours = this.getLocalTime().getHours();
        return hours > day && hours < night;
    }

    function _setData (data) {
        if (this.isDataValid(data)) _data = data;
    }

    function _getData () {
        return _data;
    }

    return {
        url: _url,
        get: _get,
        validate: _validate,
        isDataValid: _isDataValid,
        getLocalTime: _getLocalTime,
        isDay: _isDay,
        setData: _setData,
        getData: _getData
    };
}();

/**
 * Collection of city
 */
function Cities (dbName) {
    this.dbName = dbName || 'simple-weather';
    this.save();
}

Cities.prototype = function () {
    var _cities = [];

    function _getCities () {
        return _cities;
    }

    function _isValidCity (city) {
        return city.validate() && !this.isDuplicate(city);
    }

    function _isDuplicate (city) {
        _cities.forEach(function (aCity) {
            if (aCity.query === city.query) return true;
        });
        return false;
    }

    function _addCity (city) {
        if (this.isValidCity(city)) {
            _cities.push(city);
            this.save();
            $(document).trigger('cityAdded', city);
        }
    }

    function _getCity(index) {
        return _cities[index];
    }

    function _removeCity(index) {
        var city =  _cities.splice(index, 1);
        if (city.length) {
            this.save();
            $(document).trigger('cityRemoved', city);
        }
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
        save: _save,
        isDuplicate: _isDuplicate,
        isValidCity: _isValidCity
    };
}();
