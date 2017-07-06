import React from 'react';

export default class MineCounter extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            flags: 0
        };
    }

    addFlag () {
        this.setState({
            flags: this.state.flags + 1
        });
    }

    removeFlag () {
        this.setState({
            flags: this.state.flags - 1
        });
    }

    render () {
        const mines = this.props.mines;
        const flags = this.state.flags;
        let left = mines >= flags ? mines - flags : 0;

        return <div className="mines-counter">{left}</div>;
    }
}