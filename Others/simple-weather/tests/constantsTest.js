var assert = chai.assert;

describe('constants', function () {
    it('should return the correct HTML codes', function () {
        var rs = '<div data-query="query-text" class="city">'  +
               '<button class="btn refresh-btn">'              +
               '<i class="wi wi-refresh"></i>'                 +
               '</button>'                                     +
               '<button class="btn delete-btn">'               +
               '&#10060;'                                      +
               '</button>'                                     +
               '<div class="city-view"></div>'                 +
               '</div>';
        assert.equal(constants.cityView('query-text'), rs);
    });

    it('should return correct url', function () {
        var key = apiKey;
        var url = 'http://api.wunderground.com/api/' + key +'/conditions/forecast/q/City.json';
        assert.equal(constants.url('/q/City'), url);
    });

    it('should return correct icon text', function () {
        var icon1 = 'wi-showers',
            icon2 = 'wi-day-rain',
            icon3 = 'wi-night-alt-cloudy';

        assert.equal(constants.icons(true).rain, icon1);
        assert.equal(constants.icons(true).chancerain, icon2);
        assert.equal(constants.icons(false).cloudy, icon3);
    });
});
