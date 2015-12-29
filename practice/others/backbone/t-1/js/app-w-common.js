// define common variables
'use strict';

define([], function() {
    return {
        DB_NAME         : 'app-w',
    	BASE_URL        : 'http://api.wunderground.com',
    	FORECAST_FEATURE: 'conditions/forecast/geolookup',
    	GEO_FEATURE     : 'geolookup',
    	DATA_FORMAT     : 'json',
    	API_KEY         : 'c9914a3fccc20133',
    	KEY_ENTER       : 13,
    	KEY_BACKSPACE   : 8,
    	MONTH           : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    		               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };
});
