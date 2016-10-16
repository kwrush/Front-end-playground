/**
 * City class
 */
function City (query) {
    this.query = query || '';
    this.data = null;
}

City.prototype = function () {
    var day = 6;
    var night = 19;

    // Return true if the it's a valid city object
    // TODO: more specific check for query
    function _validate () {
        return  this.isQueryValid(this.query) && this.isDataValid(this.data);
    }

    // Check if the given data is valid
    function _isDataValid (data) {
        return data && data.response && data.forecast && data.current_observation;
    }

    // Check if the given query is validate
    // TODO: regexp
    function _isQueryValid (query) {
        return typeof query === 'string' && this.query.length > 0;
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
        }).then(function (response) {
            self.setData(response);
            return self;
        }).catch(function (error) {
            return Promise.reject(error);
        });
    }

    // Return an array of time ['hh', 'mm', 'ss']
    function _getLocalTime () {
        var rfc = this.data.current_observation.local_time_rfc822;
        var time = rfc.match(/\d+\:\d+\:\d+/g);
        return time[0].split(':');
    }

    // Return true if the local time is in daytime
    function _isDay () {
        var hours = parseInt(this.getLocalTime()[0], 10);
        return hours > day && hours < night;
    }

    // Set data
    function _setData (data) {
        if (this.isDataValid(data)) {
            this.data = _roundTemp(data);
        }
    }

    // Return data
    function _getData () {
        return this.data;
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
        isQueryValid: _isQueryValid,
        getLocalTime: _getLocalTime,
        isDay: _isDay,
        setData: _setData,
        getData: _getData
    };
}();
