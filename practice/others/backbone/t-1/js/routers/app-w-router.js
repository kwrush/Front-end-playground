// simple router
define([
    'jquery',
    'backbone'
], function() {
    var AppRouter = Backbone.Router.extend({
    	routes: {
    		"*current": "switchView",
    		"*forecast": "switchView"
    	},

    	initialize: function(options) {
    		this.cities = options['cities'];
    	},

    	switchView: function(param) {
    		this.cities.trigger('switchView', param);
    	}
    });

    return AppRouter;
});
