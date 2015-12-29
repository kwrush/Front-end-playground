/*
 * no auto complete as the ajax calls per minute are limited with free key...
 */
 'use strict';

 require.config({
     shim: {
         underscore: {
             exports: '_'
         },
         backbone: {
             deps: [
                 'underscore',
                 'jquery'
             ],
             exports: 'Backbone'
         },
         'backbone.localStorage': {
             deps: ['backbone'],
             exports: 'Store'
         }
     },
     paths: {
         jquery: 'lib/jquery.min',
		 underscore: 'lib/underscore.min',
		 backbone: 'lib/backbone.min',
		 'backbone.localStorage': 'lib/backbone.localStorage.min'
     }
 });

require([
	'jquery',
	'models/app-w-result',
	'collections/app-w-cities',
	'views/app-w-searchview',
	'views/app-w-weatherview',
	'routers/app-w-router',
], function($, Result, Cities, SearchView, WeatherView, AppRouter) {
	$(function() {
		var rs = new Result();
		var cities = new Cities();
		var searchView = new SearchView({ model: rs, collection: cities });
		var weatherView = new WeatherView({ collection: cities });

		var router = new AppRouter({cities: cities});
		Backbone.history.start();
	});
});
