import React from 'react';
import {keyCodes, emoji} from '../constants';

const defaultProps = {
    hasMine: false,
    marked: false,
    exposed: false,
    minesAround: 0
};

export default class Tile extends React.PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            marked: false,
            exposed: false
        };

        this.onClick = this.onClick.bind(this);
        this.toggleFlag = this.toggleFlag.bind(this);
    }

    onClick (event) {
        event.preventDefault();

        if (this.state.exposed) return;

        const btn = event.button;

        if (btn === keyCodes.RIGHT_CLICK || (btn === keyCodes.CLICK && event.altKey)) {
            this.toggleFlag();
        } else if (btn == keyCodes.CLICK && !this.state.marked) {
            this.setState({
                exposed: true
            });
        }
    }

    toggleFlag () {
        const marked = this.state.marked;
        this.setState({
            marked: !marked
        });
        this.props.toggleFlag(!marked);
    }

    render () {
        //console.log('render tile...');

        let icon = '';
        let style = '';
        if (this.state.exposed) {
            if (this.props.hasMine) {
                icon = emoji['mine'];
                style = 'tile-mine';
            } else if (this.props.minesAround > 0) {
                icon += this.props.minesAround;
                style = 'tile-' + this.props.minesAround;
            } else {
                style = 'tile-0';
            }
        } else if (this.state.marked) {
            icon = emoji['flag'];
        } else {
            // do nothing
        }

        return (
            <div className={"tile col " + style} onClick={this.onClick} onContextMenu={this.onClick}>{icon}</div>
        );
    }
}

Tile.defaultProps = defaultProps;