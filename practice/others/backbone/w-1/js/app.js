var WUResponse = Backbone.Model.extend({
	defaults: {
    name: '',
  	current_observation: null,
    response: null
  },

  url: function() {
    return 'http://api.wunderground.com/api/c9914a3fccc20133/conditions/q/' + this.get('name') + '.json';
  },

  initialize: function() {
    console.log('This model has been created.');
  },

  fetch: function() {
    return Backbone.Model.prototype.fetch.call(this, {
      success: function(data) {
        console.log(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

});

var WView = Backbone.View.extend({
  tlp: _.template($('#info-template').html()),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    var self = this;
    var data = this.model.get('current_observation') ? 
      [this.model.get('current_observation').display_location] : 
      this.model.get('response').results;

    $('#info').html(self.tlp({data: data}));
  }
});


var rs = new WUResponse({name: 'Seattle'});
var v = new WView({model: rs});
rs.fetch();