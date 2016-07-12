/**
 * Update page's view
 */
function View () {
    this.init();
}

View.prototype = function () {
    var wait = 300;
    var currentText = '';

    function _init () {
        // DOM elements
        this.$entry = $('#city-entry')
            .val(currentText)
            .on('keyup', _.bind(this.searchOnEnter, this));

        this.$results = $('#search-result')
            .on('click', 'li.result-item', _.bind(this.addCity, this));

        this.$content = $('div.content');

        // templates
        this.resultsTemplate = _.template($('#results-template').html());

        // do search in every 300ms
        this.searchOnEnter = _.debounce(this.searchOnEnter, wait);
    }

    // listen all UI events
    function _listen() {

    }

    // Update content view
    function _render (data) {

    }

    function _addCity(event) {
        var $target = $(event.target || window.event.target);
        $(document).trigger('newCity', [$target.attr('data-query')]);
    }

    function _canSearch (keyword) {
        return keyword.length > 2;
    }

    function _searchOnEnter (event) {
        var keyword = this.$entry.val().replace(/\s+/g, '');
        var self = this;

        if (_canSearch(keyword)) {
            if (keyword !== currentText) {
                _search(keyword).done(function (response) {
                    self.showResults(response);
                }).fail(function (error) {
                    self.hideResults();
                });
            }
        } else {
            this.hideResults();
        }

        currentText = keyword;
    }

    function _search (keywords) {
        return $.ajax({
            url: constants.AUTO_URL,
            method: 'GET',
            dataType: 'jsonp',
            data: {
                query: keywords
            }
        });
    }

    function _showResults(response) {
        if (response.RESULTS) {
            response.RESULTS = _resultsFilter(response.RESULTS);
            this.$results.html(this.resultsTemplate(response));
            this.$results.show();
        }
    }

    // Only cities are left
    function _resultsFilter(results) {
        return results.filter(function (elem) {
            return elem.type && elem.type === 'city';
        });
    }

    function _hideResults() {
        this.$results.hide();
    }

    return {
        init: _init,
        listen: _listen,
        hideResults: _hideResults,
        showResults: _showResults,
        searchOnEnter: _searchOnEnter,
        addCity: _addCity
    };
}();
