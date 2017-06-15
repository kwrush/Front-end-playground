const _EASY = {
    INDEX: 0,
    NAME: 'Easy',
    BOMB_NUM: 10,
    GRID_ROW: 10,
    GRID_COL: 10
};

const _MEDIUM = {
    INDEX: 1,
    NANE: 'Medium',
    BOMB_NUM: 40,
    GRID_ROW: 16,
    GRID_COL: 16
};

const _HARD = {
    INDEX: 2,
    NAME: 'Hard',
    BOMB_NUM: 99,
    GRID_ROW: 16,
    GRID_COL: 30
};

export const base = {
    KEY_CODE: {
        ALT: 18,
        ENTER: 13,
        CTRL: 17,
        LEFT_CLICK: 1,
        MID_CLICK: 2,
        RIGHT_CLICK: 3
    },

    LEVELS: {
        EASY: _EASY,
        MEDIUM: _MEDIUM,
        HARD: _HARD
    }
};