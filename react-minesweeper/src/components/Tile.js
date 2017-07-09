import React from 'react';
import {emoji, keyCodes} from '../constants';

export default class Tile extends React.Component {
    constructor (props) {
        super(props);

        this.expose = this.expose.bind(this);
        this.mark = this.mark.bind(this);
    }

    expose (event) {
        event.preventDefault();
        // Do nothing with the tile has been exposed
        if (this.props.tile.exposed) return;

        // Alt+click to mark the mine
        if (event.altKey && event.button === keyCodes.CLICK) {
            this.mark(event);
        } else {
            this.props.exposeTile(this.props.row, this.props.col);
        }
    } 

    mark (event) {
        event.preventDefault();
        if (!this.props.tile.exposed)
            this.props.markTile(this.props.row, this.props.col);
    }

    render () {
        const tile = this.props.tile;
        let display = '';
        let classNames = 'tile col ';
        if (tile.exposed) {
            if (tile.hasMine) {
                display += emoji['mine'];
                classNames += 'tile-mine';
            } else if (!tile.hasMine && !tile.marked) {
                display += tile.minesAround > 0 ? tile.minesAround : '';
                classNames += ('tile-' + tile.minesAround);
            } else if (!tile.hasMine && tile.marked) {
                display += emoji['cross'];
                classNames += 'tile-wrong';
            } 

        } else if (tile.marked) {
            display += emoji['flag'];
        }

        return (
            <div className={classNames} onClick={this.expose} onContextMenu={this.mark}>
                {display}
            </div>
        );
    }
}