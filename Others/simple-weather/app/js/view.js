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
        $(document).on('click', _.bind(this.hideResults, this));

        this.$entry = $('#city-entry')
            .val(currentText)
            .on('keyup', _.bind(this.searchOnEnter, this));

        this.$results = $('#search-result').off('click')
            .on('click', 'li.result-item', _.bind(this.addCityView, this));

        this.$content = $('div.content');

        // load template
        constants.requireTemplate('#results-template', 'search');
        constants.requireTemplate('#city-template', 'city');

        // templates
        this.resultsTemplate = _.template($('#results-template').html());
        this.cityTemplate = _.template($('#city-template').html());

        // do search in every 300ms
        this.searchOnEnter = _.debounce(this.searchOnEnter, wait);

        // prevent quick click
    }

    // Update content view
    function _render (data) {

    }

    function _renderCityView (cityView, viewData) {
        $(cityView).append(this.cityTemplate(viewData));
    }

    function _addCityView (event) {
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

    function _addTrailingEmptyCityView (query) {
        query = query.trim();
        this.$content.append(constants.cityView(query));
        this.getCityView(query).addClass('refreshing');
    }

    function _getCityView (query) {
        return $('.city[data-query="' + query + '"]');
    }

    function _removeTrailingCityView () {
        $('.city').last().remove();
    }

    function _stopRefreshing () {
        $('.city.refreshing').removeClass('refreshing');
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

    // simple alert wrapper
    function _alert(text) {
        return alert(text);
    }

    return {
        init: _init,
        alert: _alert,
        hideResults: _hideResults,
        showResults: _showResults,
        searchOnEnter: _searchOnEnter,
        addCityView: _addCityView,
        renderCityViwe: _renderCityView,
        getCityView: _getCityView,
        stopRefreshing: _stopRefreshing,
        addTrailingEmptyCityView: _addTrailingEmptyCityView,
        removeTrailingEmptyCityView: _removeTrailingCityView
    };
}();
