import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            timerId: null,
            pause: false,
            date: new Date()
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let timerId = setInterval(() => this.tick(), 1000);
        this.setState({
            timerId: timerId
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId);
    }

    tick() {
        this.setState(prevState => ({
            date: this.state.pause ? prevState.date : new Date()
        }));
    }

    showTime() {
        return this.state.date.toLocaleTimeString() + ', ' + this.getDate();
    }

    getDate() {
        return this.state.date.getMonth() + 1 + '/' + 
                    this.state.date.getDate() + '/' + 
                    this.state.date.getFullYear();
    }

    handleClick() {
        this.setState(prevState => ({
            pause: !prevState.pause
        }));
    }

    render() {
        return <h2 onClick={() => this.handleClick()}>It is {this.showTime()}.</h2>;
    } 
}

export default Clock;