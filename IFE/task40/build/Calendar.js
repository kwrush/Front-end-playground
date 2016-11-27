var Calendar = function (options) {
    'use strict';

    // Date constants
    var MONTH = 'January, February, March, April, May, June, July, August, September, October, November, December'.split(/,\s*/);
    var WEEKDAY = 'Mon, Tue, Wed, Thu, Fri, Sat, Sun'.split(/,\s*/);

    // calendar main template
    var TEMPLATE =
    '<div class="calendar-header">'                                          +
    '    <h2 class="calendar-title"></h2>'                                   +
    '    <span class="calendar-nav-button calendar-nav-prev-button"></span>' +
    '    <span class="calendar-nav-button calendar-nav-next-button"></span>' +
    '</div>'                                                    +
    '<div class="calendar-pane">'                               +
    '    <div class="calendar-view calendar-date-view">'     +
    '        <ul class="calendar-weekday-header"></ul>'         +
    '        <div class="calendar-view-wrap">'                  +
    '            <div class="calendar-prev-view"></div>'        +
    '            <div class="calendar-curr-view"></div>'        +
    '            <div class="calendar-next-view"></div>'        +
    '        </div>'                                            +
    '    </div>'                                                +
    // '    <div class="calendar-view calendar-month-view">'       +
    // '        <div class="calendar-view-wrap">'                  +
    // '            <div class="calendar-prev-view"></div>'        +
    // '            <div class="calendar-curr-view"></div>'        +
    // '            <div class="calendar-next-view"></div>'        +
    // '        </div>'                                            +
    // '    </div>'                                                +
    // '    <div class="calendar-view calendar-year-view">'        +
    // '        <div class="calendar-view-wrap">'                  +
    // '            <div class="calendar-prev-view"></div>'        +
    // '            <div class="calendar-curr-view"></div>'        +
    // '            <div class="calendar-next-view"></div>'        +
    // '        </div>'                                            +
    // '    </div>'                                                +
    '</div>';

    var defaults = {
        width: 330,
        height: 280,
        callback: {
            select: function () {}
        }
    };

    options = options || {};

    for (var prop in defaults) {
        if (!options[prop]) {
            options[prop] = defaults[prop];
        }
    }

    defaults.month = MONTH;
    defaults.weekday = WEEKDAY;

    this.options = options;
    this._defaults = defaults;
    this._mainTemplate = TEMPLATE;
    this.init();
};

Calendar.prototype = {
    constructor: Calendar,

    /*
     * Entry point of initiation
     */
    init: function () {
        this.container = this._initContainer();

        var con = this.container;
        con.style.width = this.options.width + 'px';
        con.style.height = this.options.height + 'px';

        con.innerHTML = this._mainTemplate;

        this.calendarHead = con.querySelector('.calendar-header');
        this.calendarPane = con.querySelector('.calendar-pane');

        this.calendarPane.style.width = '100%';
        this.calendarPane.style.height = con.clientHeight - this.calendarHead.offsetHeight + 'px';

        this.calendarTitle = con.querySelector('.calendar-title');
        this.prevNavButton = con.querySelector('.calendar-nav-prev-button');
        this.nextNavButton = con.querySelector('.calendar-nav-next-button');
        this.dateView      = con.querySelector('.calendar-date-view');

        this._initCalendarHeader();
        this._initDateView();

        this._listen();
    },

    /*
     * Render view
     */
    render: function () {
        this.container.innerHTML = this._mainTemplate;
    },

    /*
     * Return the date selected in default selection ('mm-dd-yyyy')
     */
    getDate: function () {

    },

    /*
     * Return the date selected in the specifed format
     */
    getDateSelection: function (format) {

    },

    _initContainer: function () {
        var con = document.getElementsByClassName('calendar')[0];
        if (con) {
            return con;
        } else {
            con = document.createElement('div');
            con.className = 'calendar';
            document.body.appendChild(con);
            return con;
        }
    },

    _initCalendarHeader: function () {
        var date = new Date();
        this.calendarTitle.innerText = this._getMonthText(date.getMonth()) + ' ' + date.getFullYear();
        this.prevNavButton.innerHTML = this._getPrevIcon();
        this.nextNavButton.innerHTML = this._getNextIcon();
    },

    _initDateView: function () {
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth();

        this.dateWrap = this.dateView.querySelector('.calendar-view-wrap');
        this.weekdayHead = this.dateView.querySelector('.calendar-weekday-header');

        this.dateWrap.style.width = '100%';
        this.dateWrap.style.height = this.dateView.clientHeight - this.weekdayHead.clientHeight + 'px';

        this.currDateView = this.dateWrap.querySelector('.calendar-curr-view');
        this.prevDateView = this.dateWrap.querySelector('.calendar-prev-view');
        this.nextDateView = this.dateWrap.querySelector('.calendar-next-view');

        this.weekdayHead.innerHTML = this._getWeekdayHeader();
        this.currDateView.innerHTML = this._getDateViewsOfMonth(year, month);
        this.prevDateView.innerHTML = this._getDateViewsOfMonth(year, month - 1);
        this.nextDateView.innerHTML = this._getDateViewsOfMonth(year, month + 1);
    },

    _initMonthView: function () {

    },

    _getWeekdayHeader: function () {
        var lis = [],
            width = 100 / this._defaults.weekday.length;
            height = 32;
        for (var i = 0, len = this._defaults.weekday.length; i < len; i++) {
            var li = document.createElement('li');
            li.innerText = this._defaults.weekday[i];
            li.style.width = width + '%';
            li.style.height = height + 'px';
            li.style.lineHeight = height + 'px';
            lis.push(li.outerHTML);
        }

        return lis.join('');
    },

    _getDateViewsOfMonth: function (year, month) {
        var date  = new Date(year, month),
            rows  = 6,
            cols  = this._defaults.weekday.length;

        var dayIndex = 0,
            dayView = [],
            today = new Date().setHours(0, 0, 0, 0),
            firstDayOfMonth = this._firstDayOfMonth(year, month),
            daysOfThisMonth = this._daysInCurrMonth(year, month),
            daysOfPrevMonth = this._daysInPrevMonth(year, month),
            daysOfNextMonth = this._daysInNextMonth(year, month);

        var dayTileWidth = this.dateWrap.clientWidth / cols,
            dayTileHeight = this.dateWrap.clientHeight / rows;

        for (var i = 0; i < rows; i++) {
            var row = i;
            for (var j = 0; j < cols; j++) {
                var col = j;
                var dayNumber = ++dayIndex - firstDayOfMonth;
                var classNames = ['calendar-day'];
                // day of last month
                if (dayNumber < 0) {
                    dayNumber = daysOfPrevMonth + dayNumber + 1;
                    dayTime = new Date(year, month - 1, dayNumber).getTime();
                    classNames.push('calendar-prev-month-day');
                } else {
                    dayNumber++;
                    // days in next month
                    if (dayNumber > daysOfThisMonth) {
                        dayNumber = dayNumber - daysOfThisMonth;
                        dayTime = new Date(year, month + 1, dayNumber).getTime();
                        classNames.push('calendar-next-month-day');
                    } else {
                        dayTime = new Date(year, month, dayNumber).getTime();
                        if (dayTime === today) classNames.push('calendar-today selected');
                    }
                }

                var d = new Date(dayTime);
                var dateView = this._getDateView(d, classNames, dayTileWidth, dayTileHeight);
                dayView.push(dateView);
            }
        }

        return dayView.join('');
    },

    _monthView: function (date) {

    },

    _getDateView: function (date, classNames, width, height) {
        var div = document.createElement('div');
        var span = document.createElement('span');

        div.appendChild(span);

        div.className = classNames.join(' ');
        div.style.width = width + 'px';
        div.style.height = height + 'px';
        div.style.lineHeight = height + 'px';
        div.setAttribute('data-year', date.getFullYear());
        div.setAttribute('data-month', date.getMonth());
        div.setAttribute('data-date', date.getDate());

        var size;
        if (width > height) {
            size = (height > 34 ? 34 : height) + 'px';
        } else {
            size = (width > 34 ? 34 : width) + 'px';
        }
        span.style.display = 'block';
        span.style.width = size;
        span.style.height = size;
        span.style.lineHeight = size;
        span.innerText = date.getDate();

        return div.outerHTML;
    },

    _getMonthText: function (month) {
        var m = month || new Date().getMonth();
        return this._defaults.month[m];
    },

    _firstDayOfMonth: function (year, month) {
        return new Date(year, month).getDay();
    },

    _getPrevIcon: function () {
        return '<svg class="calendar-nav-icon" viewBox="0 0 24 24">'                 +
               '    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>' +
               '</svg>';
    },

    _getNextIcon: function () {
        return '<svg class="calendar-nav-icon" viewBox="0 0 24 24">'                 +
               '    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>' +
               '</svg>';
    },

    /**
     * Get total days in this month
     */
    _daysInCurrMonth: function (year, month) {
        return this._totalDaysInMonth(year, month + 1);
    },

    /**
     * Get total days in next month
     */
    _daysInNextMonth: function (year, month) {
        return this._totalDaysInMonth(year, month + 2);
    },

    /**
     * Get total days in last month
     */
    _daysInPrevMonth: function (year, month) {
        return this._totalDaysInMonth(year, month);
    },

    /**
     * Get total days in the month of the year
     */
    _totalDaysInMonth: function (year, month) {
        var y = year || new Date().getFullYear();
        var m = month || new Date().getMonth() + 1;
        return new Date(y, m, 0).getDate();
    },

    _listen: function () {
        this.calendarHead.addEventListener('click', this._handleNavigation.bind(this));
    },

    _handleNavigation: function (event) {
        event = event || window.event;
        event.preventDefault();

        var target = event.target || event.srcElement;

        while (target.tagName !== 'SPAN') {
            target = target.parentElement;
        }

        if (target === this.nextNavButton) {
            this.nextDateView.style.transform = 'translateX(0)';
            this.currDateView.style.transform = 'translateX(-100%)';
            this.prevDateView.style.transform = 'translateX(-200%)';
        } else if (target === this.prevNavButton) {
            this.nextDateView.style.transform = 'translateX(200%)';
            this.currDateView.style.transform = 'translateX(100%)';
            this.prevDateView.style.transform = 'translateX(0)';
        }
    },

    _isDate: function (date) {
        return this._isa(date, 'Date');
    },

    _isa: function (object, type) {
        var name = Object.prototype.toString.call(object);
        return name === '[object ' + type.trim() + ']';
    }
};
