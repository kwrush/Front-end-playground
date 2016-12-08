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
        // DOM elements and events binding
        $(document).off('click')
            .on('click', _.bind(this.hideResults, this));

        this.$entry = $('#city-entry').val(currentText)
            .on('keyup', _.bind(this.searchOnEnter, this));

        this.$results = $('#search-result').off('click')
        .on('click', 'li.result-item', _.bind(this.addCity, this));

        this.$content = $('div.content').off('click')
            .on('click', 'button.refresh-btn', _.bind(this.updateCity, this))
            .on('click', 'button.delete-btn', _.bind(this.deleteCity, this));

        // load template
        constants.requireTemplate('#results-template', 'search');
        constants.requireTemplate('#city-template', 'city');

        // parse templates
        this.resultsTemplate = _.template($('#results-template').html());
        this.cityTemplate = _.template($('#city-template').html());

        // do search in every 300ms
        this.searchOnEnter = _.debounce(this.searchOnEnter, wait);
    }

    function _addTrailingEmptyCityView (query) {
        this.addCityView(query);

        var $newView = this.getCityView(query);

        $newView.last().children('.refresh-btn').css('color', '#333');
        this.startRefreshing($newView);
    }

    function _removeTrailingCityView () {
        $('.city').last().remove();
    }

    // Append the specified city view
    function _addCityView (query) {
        query = query.trim();
        this.$content.append(constants.cityView(query));
    }

    // Remove the given city view
    function _removeCityView (cityView) {
        $(cityView).remove();
    }

    // Return the specified city view elements
    function _getCityView (query) {
        return $('.city[data-query="' + query + '"]');
    }

    function _startRefreshing (cityView) {
        $(cityView).last().addClass('refreshing');
    }

    function _stopRefreshing (cityView) {
        $(cityView).removeClass('refreshing');
    }

    // filling data in city view
    function _renderCityView (cityView, viewData) {
        var color = constants.colors();
        $(cityView).last().children('button.refresh-btn').css('color', '#fff');

        $(cityView).last().children('div.city-view')
                   .html(this.cityTemplate(viewData))
                   .css('color', color)
                   .children('.color-board')
                   .css('background', color);
    }

    // Callback fires when we click on one search result
    function _addCity (event) {
        var $target = $(event.target || window.event.target);
        $(document).trigger('newCity', [$target.attr('data-query')]);
    }

    // Callback fires when we click on refresh button
    function _updateCity (event) {
        var $target = $(event.target || window.event.target);
        var $cityView = $target.closest('div.city');
        if (!_isRefreshing.call(this, $cityView)) {
            $(document).trigger('updateCity', [$cityView.attr('data-query')]);
        }
    }

    // Return true is it's still refreshing
    function _isRefreshing (cityView) {
        return $(cityView).hasClass('refreshing');
    }

    // Callback fires when we click on delete button
    function _deleteCity (event) {
        var $target = $(event.target || window.event.target);
        var $cityView = $target.closest('div.city');
        $(document).trigger('removeCity', [$cityView.attr('data-query')]);
    }

    // Do searching once typing more than two letters
    function _canSearch (keyword) {
        return keyword.length > 2;
    }

    // Auto complete when typing city's name
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

    // Only display cities
    function _resultsFilter(results) {
        return results.filter(function (elem) {
            return elem && elem.type && elem.type === 'city';
        });
    }

    // Show auto complete list
    function _showResults(response) {
        if (response && response.RESULTS) {
            response.RESULTS = _resultsFilter(response.RESULTS);
            this.$results.html(this.resultsTemplate(response));
            this.$results.show();
        }
    }

    // Hide auto complete list
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
        addCity: _addCity,
        updateCity: _updateCity,
        deleteCity: _deleteCity,
        renderCityView: _renderCityView,
        getCityView: _getCityView,
        startRefreshing: _startRefreshing,
        stopRefreshing: _stopRefreshing,
        addTrailingEmptyCityView: _addTrailingEmptyCityView,
        addCityView: _addCityView,
        removeTrailingEmptyCityView: _removeTrailingCityView,
        removeCityView: _removeCityView
    };
}();
