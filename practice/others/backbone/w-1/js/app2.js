var Forecast = Backbone.Model.extend({
    urlRoot: 'http://api.wunderground.com/api/c9914a3fccc20133/conditions/',
    
    defaults: {
        dataType: 'json',
        query: ''
    },
    
    initialize: function() {
        console.log('Forecast model has been created.');
    },
    
    url: function() {
        return this.urlRoot + this.get('query') + '.' + this.get('dataType');
    },
    
    fetch: function(callback) {
        return Backbone.Model.prototype.fetch.call(this, {
            success: function(data) {
                callback.call(this);
            },
            
            error: function(err) {
                console.log(err);
            }
        });
    }
});

var Cities = Backbone.Collection.extend({
    model: Forecast
});

var EnterView = Backbone.View.extend({
    el: '#enter',
    
    tlp: _.template($('#suggest-template').html()),
    
    events: {
        'keydown #input': 'getSuggest',
        'click #new-btn': 'addCity',
    },
   
    initialize: function() {
        var self = this;
        this.input = $('#input');
        this.list = $('#enter ul');
        
        this.listenTo(this.model, 'destory', this.hide);
        this.listenTo(this.model, 'change', this.show);
    },
    
    getSuggest: function(evt) {
        
        if (evt.keyCode !== 8) {
            var val = $(evt.target).val().trim();
            var name = val.length > 0 ? 'q/' + val : undefined;
        }
        
        if (!name || name.length < 4) {
            this.hide();
            return;
        }
        
        this.model ? 
            this.model.set({query: name}) 
            : (this.model = new Forecast({query: name}));
    },
    
    addCity: function(evt) {
        console.log(this.input.val());
    },
    
    hide: function() {
        this.list.addClass('hide');
        return this;
    },
    
    show: function() {
        this.model.fetch(this.update.bind(this));
        
        /* this.render();
        this.list.removeClass('hide'); */
            
        return this;
    },
    
    update: function() {
        this.render();
        this.list.removeClass('hide');
    },
    
    render: function() {
        var self = this;
        var data = [];
        
        if (this.model.changed.current_observation) {
            data.push(this.model.get('current_observation').display_location);
        }
        else if (this.model.changed.response) {
            if (this.model.get('response').results) {
                data = this.model.get('response').results;
            }
            else {
                this.hide();
            }
        }
        
        /* var data = this.model.get('current_observation') ? 
            [this.model.get('current_observation').display_location] : 
            this.model.get('response').results; */
            
        data.length > 0 && $('#enter ul').html(self.tlp({data: data}));
        console.log(data);
        return this;
    } 
});

$(function() {
    var enter = new EnterView({ model: new Forecast()} );
});




