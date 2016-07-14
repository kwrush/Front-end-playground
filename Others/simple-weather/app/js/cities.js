/**
 * Collection of city
 */
function Cities (dbName) {
    this.dbName = dbName || 'simple-weather';
}

Cities.prototype = function () {
    var _cities = [];

    function _init () {
        _load.call(this);
        if (_cities.length > 0) {
            $(document).trigger('citiesLoaded', [_cities]);
        } else {
            this.save();
        }
    }

    function _getCities () {
        return _cities;
    }

    function _isValidCity (city) {
        return city.validate() && !this.isDuplicate(city);
    }

    function _isDuplicate (city) {
        var duplicate = false;
        _cities.forEach(function (aCity) {
            if (aCity.query === city.query) {
                duplicate = true;
                return;
            }
        });
        return duplicate;
    }

    function _addCity (city) {
        if (this.isValidCity(city)) {
            _cities.push(city);
            this.save();
            $(document).trigger('cityAdded', city);
        } else {
            $(document).trigger('cityDuplicated', [city]);
        }
    }

    function _getCity (index) {
        return _cities[index];
    }

    function _getCityByQuery (query) {
        for (var i = 0; i < _cities.length; i++) {
            if (_cities[i].query === query) {
                return this.getCity(i);
            }
        }
    }

    function _removeCity (index) {
        var city =  _cities.splice(index, 1);
        if (city.length) {
            this.save();
            $(document).trigger('cityRemoved', [city]);
        }
    }

    function _removeCityByQuery (query) {
        for (var i = 0; i < _cities.length; i++) {
            if (_cities[i].query === query) {
                return this.removeCity(i);
            }
        }
    }

    // local storage
    function _save () {
        localStorage.setItem(this.dbName, JSON.stringify(_cities));
    }

    // load data from localStorage
    // TODO: could verify data more completely
    function _load () {
        var raw = localStorage.getItem(this.dbName);
        if (raw) {
            var data = JSON.parse(raw);
            if (data && typeof data === 'object') {
                data.forEach(function (elem, index) {
                    if (elem.query && elem.data) {
                        var city = new City (elem.query);
                        city.setData(elem.data);
                        _cities[index] = city;
                    }
                });
            }
        }
    }

    function _fetchAt (index) {
        var city = this.getCity(index);
        if (city) {
            return city.fetch();
        } else {
            throw Error('Index out of boundary.');
        }
    }

    function _fetchAll () {
        return _cities.reduce(function (sequence, city) {
            return sequence.then(function () {
                return city.fetch();
            });
        }, Promise.resolve());
    }

    return {
        init: _init,
        getCities: _getCities,
        addCity: _addCity,
        getCity: _getCity,
        getCityByQuery: _getCityByQuery,
        removeCity: _removeCity,
        removeCityByQuery: _removeCityByQuery,
        save: _save,
        isDuplicate: _isDuplicate,
        isValidCity: _isValidCity,
        fetchAt: _fetchAt,
        fetchAll: _fetchAll
    };
}();
