/**
 * Collection of city
 */
function Cities (dbName) {
    this.dbName = dbName || 'simple-weather';
    this.cities = [];
}

Cities.prototype = function () {

    function _init () {
        var self = this;
        _load.call(this).then(function () {
            $(document).trigger('citiesLoaded', [self.cities]);
        }).catch(function (error) {
            return Promise.reject(error);
        });
    }

    function _getCities () {
        return this.cities;
    }

    function _isValidCity (city) {
        return city.validate() && !this.isDuplicate(city);
    }

    function _isDuplicate (city) {
        var duplicate = false;
        this.cities.forEach(function (aCity) {
            if (aCity.query === city.query) {
                duplicate = true;
                return;
            }
        });
        return duplicate;
    }

    function _addCity (city) {
        if (this.isValidCity(city)) {
            this.cities.push(city);
            this.save();
            $(document).trigger('cityAdded', city);
        } else {
            $(document).trigger('cityDuplicated', [city]);
        }
    }

    function _getCity (index) {
        return this.cities[index];
    }

    function _getCityByQuery (query) {
        for (var i = 0; i < this.cities.length; i++) {
            if (this.cities[i].query === query) {
                return this.getCity(i);
            }
        }
    }

    function _removeCity (index) {
        var city =  this.cities.splice(index, 1);
        if (city.length) {
            this.save();
            $(document).trigger('cityRemoved', city);
        }
    }

    function _removeCityByQuery (query) {
        for (var i = 0; i < this.cities.length; i++) {
            if (this.cities[i].query === query) {
                return this.removeCity(i);
            }
        }
    }

    // local storage
    function _save () {
        localStorage.setItem(this.dbName, JSON.stringify(this.cities));
    }

    // load data from localStorage
    // TODO: could verify data more completely
    function _load () {
        var self = this;

        return new Promise(function (resolve, reject) {
            var raw = localStorage.getItem(self.dbName);
            if (!raw) {
                return Promise.reject(Error('No such data field.'));
            }
            resolve(raw);
        }).then(function (rawData) {
            var data = JSON.parse(rawData);
            if (!data || typeof data !== 'object') {
                return Promise.reject(Error('Invalid data type.'));
            }
            return data;
        }).then(function (data) {
            return Promise.all(data.map(function (elem, index) {
                if (!elem.query || !elem.data) {
                    return Promise.reject(Error('invalid data values.'));
                }
                var city = new City(elem.query);
                city.setData(elem.data);
                self.cities[index] = city;
            }));
        }).catch(function (error) {
            return Promise.reject(error);
        });
    }

    function _newCity (query) {
        var self = this;
        var city = new City(query);
        return city.fetch().then(function (city) {
            self.addCity(city);
        }).catch(function (error) {
            return Promise.reject(error);
        });
    }

    function _fetchFor (identity) {
        var city = null;
        if (typeof identity === 'number') {
            city = this.getCity(identity);
        } else if (typeof identity === 'string') {
            city = this.getCityByQuery(identity);
        }
        return new Promise(function (resolve, reject) {
            if (!city) {
                reject(error);
            }
            resolve(city);
        }).then(function (city) {
            return city.fetch().then(function (city) {
                $(document).trigger('cityUpdated', [city]);
            }).catch(function (error) {
                return Promise.reject(error);
            });
        }).catch(function (error) {
            return Promise.reject(error);
        });
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
        fetchFor: _fetchFor,
        newCity: _newCity
    };
}();
