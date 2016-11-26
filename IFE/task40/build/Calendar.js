var Calendar = function (options) {
    'use strict';

    // Date constants
    var MONTH = 'January, February, March, April, May, June, July, August, September, October, November, December'.split(/,\s*/);
    var WEEKDAY = 'Mon, Tue, Wed, Thu, Fri, Sat, Sun'.split(/,\s*/);

    // All years can be reached
    var AVAILABLE_YEARS = [1916, 2116];

    // default container
    var CONTAINER = document.querySelector('.calendar') || document.body;
    var DAY_ROW_NUMS = 6;
    var DAY_COL_NUMS = 7;

    // calendar main template
    var TEMPLATE =
    '<div class="calendar-header">'                                              +
    '    <h2 class="calendar-title"></h2>'                                       +
//    '    <div class="calendar-nav calendar-nav-prev">'                           +
    '        <span class="calendar-nav-button calendar-nav-prev-button"></span>' +
//    '    </div>'                                                                 +
//    '    <div class="calendar-nav calendar-nav-next">'                           +
    '        <span class="calendar-nav-button calendar-nav-next-button"></span>' +
//    '    </div>'                                                                 +
    '</div>'                                                    +
    '<div class="calendar-pane">'                               +
    '    <div class="calendar-view calendar-weekday-view">'     +
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

    var PREV_ICON =
    '<svg class="calendar-nav-icon" viewBox="0 0 24 24">'                 +
    '    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>' +
    '</svg>';

    var NEXT_ICON =
    '<svg class="calendar-nav-icon" viewBox="0 0 24 24">'                 +
    '    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>' +
    '</svg>';


    var defaults = {
        prevIcon: PREV_ICON,
        nextIcon: NEXT_ICON,
        weekDayFormat: WEEKDAY,
        monthFormat: MONTH,
        availableYears: AVAILABLE_YEARS,
        dayRows: DAY_ROW_NUMS,
        dayCols: DAY_COL_NUMS
    };

    //defaults.weekDayFormat = WEEKDAY.

    options = options || {};

    for (var prop in defaults) {
        if (!options[prop]) {
            options[prop] = defaults[prop];
        }
    }

    this.options = options;
    this.container = CONTAINER;
    this.mainTemplate = TEMPLATE;
    this.init();
};

Calendar.prototype = {
    constructor: Calendar,

    /*
     * Entry point of initiation
     */
    init: function () {
        this.date = new Date();
        this.render();

        var con = this.container;
        this.calendarHead = con.querySelector('.calendar-header');
        this.calendarPane = con.querySelector('.calendar-pane');

        this.calendarTitle = this.calendarHead.querySelector('.calendar-title');
        this.prevNavButton = this.calendarHead.querySelector('.calendar-nav-prev-button');
        this.nextNavButton = this.calendarHead.querySelector('.calendar-nav-next-button');
        this.weekdayView = this.calendarPane.querySelector('.calendar-weekday-view');

        this._initHeaderView();
        this._initWeekdayView();
    },

    /*
     * Render view
     */
    render: function () {
        this.container.innerHTML = this.mainTemplate;
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

    _initView: function () {

    },

    _initHeaderView: function () {
        var date = new Date();
        this.calendarTitle.innerText = this._getMonthText(date.getMonth()) + ' ' + date.getFullYear();
        this.prevNavButton.innerHTML = this.options.prevIcon;
        this.nextNavButton.innerHTML = this.options.nextIcon;
    },

    _initWeekdayView: function () {
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth();

        var header   = this.weekdayView.querySelector('.calendar-weekday-header');
        var currView = this.weekdayView.querySelector('.calendar-curr-view');
        var prevView = this.weekdayView.querySelector('.calendar-prev-view');
        var nextView = this.weekdayView.querySelector('.calendar-next-view');

        header.innerHTML   = header && this._weekdayViewHeader();
        currView.innerHTML = currView && this._weekdayViewOfMonth(year, month);
        //prevView.innerHTML = prevView && this._weekdayViewOfMonth(year, month - 1);
        //nextView.innerHTML = nextView && this._weekdayViewOfMonth(year, month + 1);
    },

    _initMonthView: function () {

    },

    _initYearView: function () {

    },

    _weekdayViewHeader: function () {
        var lis = '';
        for (var i = 0, len = this.options.weekDayFormat.length; i < len; i++) {
            var li = document.createElement('li');
            li.innerText = this.options.weekDayFormat[i];
            lis += li.outerHTML;
        }

        return lis;
    },

    _weekdayViewOfMonth: function (year, month) {
        var date  = new Date(year, month),
            rows  = this.options.dayRows,
            cols  = this.options.dayCols;

        var dayIndex = 0,
            dayView = '',
            today = new Date().setHours(0, 0, 0, 0),
            firstDayOfMonth = this._firstDayOfMonth(year, month),
            daysOfThisMonth = this._daysInCurrMonth(year, month),
            daysOfPrevMonth = this._daysInPrevMonth(year, month),
            daysOfNextMonth = this._daysInNextMonth(year, month);

        var dayTileWidth = 1 / cols * 100;

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
                        if (dayTime === today) classNames.push('calendar-today');
                    }
                }

                var d = new Date(dayTime);
                var span = document.createElement('span');
                span.className = classNames.join(' ');
                span.style.width = dayTileWidth + '%';
                span.innerText = d.getDate();
                span.setAttribute('data-year', d.getFullYear());
                span.setAttribute('data-month', d.getMonth());
                span.setAttribute('data-date', d.getDate());
                dayView += span.outerHTML;
            }
        }

        return dayView;
    },

    _monthView: function (date) {

    },

    _yearView: function (date) {

    },

    _getMonthText: function (month) {
        var m = month || new Date().getMonth();
        return this.options.monthFormat[m];
    },

    _firstDayOfMonth: function (year, month) {
        return new Date(year, month).getDay();
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

    _isDate: function (date) {
        return this._isa(date, 'Date');
    },

    _isa: function (object, type) {
        var name = Object.prototype.toString.call(object);
        return name === '[object ' + type.trim() + ']';
    }
};
