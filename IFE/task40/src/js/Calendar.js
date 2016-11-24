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
    '<div class="calendar-header">'                             +
    '    <span class="calendar-nav calendar-nav-prev"></span>'  +
    '    <span class="calendar-nav calendar-nav-next"></span>'  +
    '    <h2 class="calendar-title"></h2>'                      +
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
    '    <div class="calendar-view calendar-month-view">'       +
    '        <div class="calendar-view-wrap">'                  +
    '            <div class="calendar-prev-view"></div>'        +
    '            <div class="calendar-curr-view"></div>'        +
    '            <div class="calendar-next-view"></div>'        +
    '        </div>'                                            +
    '    </div>'                                                +
    '    <div class="calendar-view calendar-year-view">'        +
    '        <div class="calendar-view-wrap">'                  +
    '            <div class="calendar-prev-view"></div>'        +
    '            <div class="calendar-curr-view"></div>'        +
    '            <div class="calendar-next-view"></div>'        +
    '        </div>'                                            +
    '    </div>'                                                +
    '</div>';

    var defaults = {
        monthFormat: MONTH,
        weekDayFormat: WEEKDAY,
        availableYears: AVAILABLE_YEARS,
        dayRows: DAY_ROW_NUMS,
        dayCols: DAY_COL_NUMS
    };

    options = options || {};

    for (var prop in defaults) {
        if (typeof options[prop] === 'undefined') {
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
        //this.render();

        var con = this.container;
        this.calendarHead = con.querySelector('.calendar-header');
        this.calendarPane = con.querySelector('.calendar-pane');

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

    _weekdayViewOfMonth: function (remark) {
        var date  = new Date(),
            year  = date.getFullYear(),
            month = date.getMonth(),
            day   = date.getDate();

        if (remark === 'next') {
            totalDays = this._daysInNextMonth(date);
        } else if (remark === 'prev') {
            totalDays = this._daysInPrevMonth(date);
        } else {
            totalDays = this._daysInCurrMonth(date);
        }


    },

    _weekdayView: function () {

    },

    _monthView: function () {

    },

    _yearView: function () {

    },

    /**
     * Get total days in this month
     */
    _daysInCurrMonth: function (date) {
        var d = this._isDate(date) || new Date();
        return this._totalDaysInMonth(d.getFullYear(), d.getMonth() + 1);
    },

    /**
     * Get total days in next month
     */
    _daysInNextMonth: function (date) {
        var d = this._isDate(date) || new Date();
        return this._totalDaysInMonth(d.getFullYear(), d.getMonth() + 2);
    },

    /**
     * Get total days in last month
     */
    _daysInPrevMonth: function (date) {
        var d = this._isDate(date) || new Date();
        return  this._totalDaysInMonth(d.getFullYear(), d.getMonth());
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
