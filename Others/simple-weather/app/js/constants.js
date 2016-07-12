var constants = (function (key) {
    return {
        url: function (query) {
            return 'http://api.wunderground.com/api/' + key + '/geolookup/conditions' + query + '.json';
        },
        
        AUTO_URL: 'http://autocomplete.wunderground.com/aq?&cb=call=?'
    };
})(apiKey);
