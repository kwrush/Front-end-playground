import React from 'react';

export default class Timer extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            timePassed: 0
        }

        this.timer = null;
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentWillMount () {
        this.stopTimer();
        this.startTimer();
    }

    componentWillReceiveProps (nextProps) {
        const nextStatus = nextProps.status;

        if (nextStatus === 'win' || nextStatus === 'gameOver') {
            this.stopTimer();

        } else if ( nextStatus === 'playing') {
            this.stopTimer();
            this.setState({
                timePassed: 0
            });
            this.startTimer();
        }
    }

    shouldComponentUpdate () {
        const status = this.state.status;
        return !(status === 'win' || status === 'gameOver');
    }

    componentWillUnmount () {
        this.stopTimer();
    }

    startTimer () {
        this.timer = setInterval(() => this.tick(), 1000);
    }

    stopTimer () {
        clearInterval(this.timer);
        this.timer = null;
    }

    tick () {
        this.setState({
            timePassed: this.state.timePassed + 1
        });
    }

    render () {
        return (
            <div id="timer">{this.state.timePassed}</div>
        );
    }
}