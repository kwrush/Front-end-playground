/**
 * City class
 */
function City (query) {
    this.query = query || '';
    this.data = this.getData();
}

City.prototype = function () {
    var day = 6;
    var night = 19;

    var _data = null;

    // Return true if the it's a valid city object
    // TODO: more specific check for query
    function _validate () {
        return this.query.length > 0 && this.isDataValid(_data);
    }

    // Check if the given data is valid
    function _isDataValid (data) {
        return data && data.response && data.forecast && data.current_observation;
    }

    // Return the json url of this city
    function _url () {
        return constants.url(this.query);
    }

    // Get data from URL
    function _get () {
        var self = this;
        return $.ajax({
            url: this.url(),
            method: 'GET',
            async: true,
            dataType: 'jsonp',
        });
    }

    // Fetch data and return a Promise
    function _fetch () {
        var self = this;
        return new Promise (function (resolve, reject) {
            self.get().success(function (response) {
                resolve(response);
            }).fail(function (error) {
                reject(error);
            });
        });
    }

    // Return an array of time ['hh', 'mm', 'ss']
    function _getLocalTime () {
        var rfc = _data.current_observation.local_time_rfc822;
        var time = rfc.match(/\d+\:\d+\:\d+/g);
        return time[0].split(':');
    }

    // Return true if the local time is in daytime
    function _isDay () {
        var hours = parseInt(this.getLocalTime()[0], 10);
        return hours > day && hours < night;
    }

    // Set _data
    function _setData (data) {
        if (this.isDataValid(data)) {
            data = _roundTemp(data);
            this.data = _data = data;
        }
    }

    // Return _data
    function _getData () {
        this.data = _data;
        return _data;
    }

    // Round temperature value
    function _roundTemp (data) {
        data.current_observation.temp_c = Math.round(data.current_observation.temp_c);
        return data;
    }

    return {
        url: _url,
        get: _get,
        fetch: _fetch,
        validate: _validate,
        isDataValid: _isDataValid,
        getLocalTime: _getLocalTime,
        isDay: _isDay,
        setData: _setData,
        getData: _getData
    };
}();
