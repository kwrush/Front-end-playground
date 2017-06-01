(function () {
    'use strict';

    /**
     * Keyboard and mouse code
     */
    MineSweeper.KEYCODE = {
        ALT: 18,
        ENTER: 13,
        CTRL: 17,
        LEFT_CLICK: 1,
        MID_CLICK: 2,
        RIGHT_CLICK: 3
    };

    /**
     * Levels
     */
    var _EASY = {
        INDEX: 0,
        NAME: 'Easy',
        BOMB_NUM: 10,
        GRID_X: 10,
        GRID_Y: 10
    };

    var _MEDIUM = {
        INDEX: 1,
        NANE: 'Medium',
        BOMB_NUM: 40,
        GRID_X: 16,
        GRID_Y: 16
    };

    var _HARD = {
        INDEX: 2,
        NAME: 'Hard',
        BOMB_NUM: 99,
        GRID_X: 16,
        GRID_Y: 30
    };

    mineSweeper.EASY = _EASY;
    mineSweeper.MEDIUM = _MEDIUM;
    mineSweeper.HARD = _HARD; 
    mineSweeper.DEFAULT_LEVEL = _EASY;

    /**
     * State of game
     */
    mineSweeper.STATE = {
        OVER: 0,
        WIN: 1,
        RUNNING: 2
    };

})();