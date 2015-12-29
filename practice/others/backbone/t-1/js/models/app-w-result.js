/*
 * ../models/app-w-result.js
 * Search result
 */
 define([
     'underscore',
     'backbone',
     'app-w-common'
 ], function(_, Backbone, AppData) {
     'use strict';

     var Result = Backbone.Model.extend({
     	defaults: {
     		query: '',
     		response: null
     	},

     	initialize: function() {
     		console.log('Result model has been initialized.');
     	},

     	url: function() {
     		return AppData.BASE_URL + '/api/'
     			+ AppData.API_KEY + '/'
     			+ AppData.GEO_FEATURE + '/q/'
     			+ this.get('query') + '.'
     			+ AppData.DATA_FORMAT;
     	}
     });

     return Result;
 });
