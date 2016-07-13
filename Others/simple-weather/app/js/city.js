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
        return data && data.response && data.forecast && data.current_observation;
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
            data = _format(data);
            _data = data;
        }
    }

    // Return _data
    function _getData () {
        return _data;
    }

    // Format a couple of data values
    function _format (data) {
        // var precip = parseFloat(data.current_observation.precip_today_metric, 10);
        // precip = isNaN(precip) ? 'N/A' : precip + 'mm';
        // data.current_observation.precip_today_metric = precip;
        data.current_observation.temp_c = Math.round(data.current_observation.temp_c);
        return data;
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
