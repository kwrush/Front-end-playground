import {emojify} from 'react-emojione';

export const levels = {
    beginner: {
        name: 'Beginner',
        mines: 10,
        row: 9,
        col: 9
    },
    intermediate: {
        name: 'Intermediate',
        mines: 40,
        row: 16,
        col: 16
    },
    expert: {
        name: 'Expert',
        mines: 99,
        row: 16,
        col: 30
    }
};

export const emoji = (() => {

    const opt = {output: 'unicode'};

    return {
        playing: emojify(':neutral_face:', opt),
        gameOver: emojify(':boom:', opt),
        win: emojify(':sunglasses:', opt),
        flag: emojify(':triangular_flag_on_post:', opt),
        mine: emojify(':bomb:', opt),
        clock: emojify(':clock3:', opt),
        cross: emojify(':x:', opt)
    };
})();

export const keyCodes = {
    CLICK: 0,
    RIGHT_CLICK: 2,
    ALT_KEY: 18,
    CTRL_KEY: 17,
    SHIFT_KEY: 16,
    R: 82
}