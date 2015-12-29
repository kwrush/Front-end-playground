/*
 * ../models/app-w-city.js
 * weather of this city
 */
 define([
     'underscore',
     'backbone',
     'app-w-common'
 ], function(_, Backbone, AppData) {
     'use strict';

     var City = Backbone.Model.extend({
       defaults: {
           link: '', // /q/link_code
           localTime: '', // hh:mm, MM dd
           location: null,
           current_observation: null,
           forecase: null
       },

       validate: function(attrs) {
           if (!attrs.link) {
               return 'Query link cannot be empty.';
           }
       },

       initialize: function() {
           console.log('City model has been initialized.');
       },

       fetchFromServer: function(options) {
           return Backbone.Model.prototype.fetch.call(this, options);
       },

       setLocalTime: function() {
           if (!this.attributes.current_observation) return;

           var timeString = new Date().toLocaleString('en-US', { timeZone: this.get('current_observation').local_tz_long });
           var date = new Date(timeString);

           var localTime = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
               + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ', '
               + AppData.MONTH[date.getMonth()] + ' '
               + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

           this.set({ localTime: localTime });

           return this;
       },

       getForecast: function() {
           var forecast = [];

           if (this.has('forecast')) {
               var data = this.get('forecast').simpleforecast.forecastday;

               for (var i = 0; i < data.length; i++) {
                   var dataItem = data[i];

                   var date = dataItem.date.weekday_short + ', '
                       + AppData.MONTH[parseInt(dataItem.date.month, 10) - 1] + ' '
                       + dataItem.date.day;

                   var tempHigh = dataItem.high.celsius;
                   var tempLow = dataItem.low.celsius;

                   var iconURL = dataItem.icon_url;
                   var iconName = dataItem.icon;

                   var item = {
                       date: date,
                       temp_c_h: tempHigh,
                       temp_c_l: tempLow,
                       icon_url: iconURL,
                       icon_name: iconName
                   };

                   forecast.push(item);
               }
           }

           return forecast;
       },

       url: function() {
           return AppData.BASE_URL + '/api/'
               + AppData.API_KEY + '/'
               + AppData.FORECAST_FEATURE
               + this.get('link') + '.'
               + AppData.DATA_FORMAT;
       }

     });

     return City;
 });
