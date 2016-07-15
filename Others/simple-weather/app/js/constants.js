var constants = (function (key) {
    var randomColorIndex = {};

    return {
        requireTemplate: function (templateName, templateFileName) {
            var template = $(templateName);
            if (template.length === 0) {
                var templateDir = 'app/templates';
                var templateUrl = templateDir + '/' + templateFileName + '.html';
                var templateString = '';

                $.ajax({
                    url: templateUrl,
                    method: 'GET',
                    async: false,
                    contentType: 'html',
                    success: function (data) {
                        templateString = data;
                    },
                    fail: function (error) {
                        console.error('Failed to load template:' + error);
                    }
                });

                $('head').append(templateString);
            }
        },

        cityView: function (query) {
            return '<div data-query="' + query + '" class="city">' +
                   '<button class="btn refresh-btn">'              +
                   '<i class="wi wi-refresh"></i>'                 +
                   '</button>'                                     +
                   '<button class="btn delete-btn">'               +
                   '&#10060;'                                      +
                   '</button>'                                     +
                   '<div class="city-view"></div>'                 +
                   '</div>';
        },

        url: function (query) {
            return 'http://api.wunderground.com/api/' + key + '/conditions/forecast' + query + '.json';
        },

        AUTO_URL: 'http://autocomplete.wunderground.com/aq?&cb=call=?',

        icons: function (day) {
            var time = day ? 'day' : 'night';
            return {
                'chanceflurries': 'wi-snow-wind',
                'hazy':           'wi-day-haze',
                'mostlycloudy':   'wi-cloudy',
                'mostlysunny':    'wi-sunny',
                'partlysunny':    'wi-day-sunny',
                'rain':           'wi-showers',
                'sleat':          'wi-sleet',
                'snow':           'wi-snow',
                'sunny':          'wi-day-sunny',
                'tstorms':        'wi-thunderstorm',
                'unknown':        'wi-day-sunny',
                'chancerain':     'wi-' + time + '-rain',
                'chancesleat':    'wi-' + time + '-sleet',
                'chancesnow':     'wi-' + time + '-snow',
                'chancetstorms':  day ? 'wi-day-thunderstorm' : 'wi-night-alt-thunderstorm',
                'clear':          day ? 'wi-day-sunny' : 'wi-night-clear',
                'cloudy':         day ? 'wi-day-cloudy' : 'wi-night-alt-cloudy',
                'flurries':       day ? 'wi-day-snow-wind' : 'wi-night-alt-snow-wind',
                'partlycloudy':   day ? 'wi-day-cloudy' : 'wi-night-alt-cloudy',
            };
        },

        colors: function () {
            var colorSets = [
                '#EF5350', '#C62828',
                '#AB47BC', '#6A1B9A',
                '#7E57C2', '#BA68C8',
                '#5C6BC0', '#283593',
                '#304FFE', '#2962FF',
                '#F50057', '#0091EA',
                '#0097A7', '#00796B',
                '#7C4DFF', '#EF6C00',
                '#E65100', '#F4511E',
                '#A1887F', '#607D8B',
                '#0097A7', '#FF5252',
                '#AD1457', '#C51162'
            ];
            return colorSets[Math.floor(Math.random() * colorSets.length)];
        }
    };
})(apiKey);
