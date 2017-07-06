import React from 'react';

const defaultProps = {
    levels: {}
};

export default class Levels extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: this.props.value
        }

        this.renderOptions = this.renderOptions.bind(this);
        this.onLevelChange = this.onLevelChange.bind(this);
    }

    shouldComponentUpdate (nextProps, nextState) {
        return this.state.value !== nextState.value;
    }

    componentDidUpdate () {
        this.props.onChange(this.state.value);
    }

    onLevelChange (event) {
        this.setState({
            value: event.target.value
        });
    }

    renderOptions () {
        const levelKeys = Object.keys(this.props.levels)
        return levelKeys.map(key => {
            return <option key={key} value={key}>{this.props.levels[key].name}</option>
        });
    }

    render () {
        return (
            <div id="levels">
                <form>
                    <label htmlFor="level-select" id="levels-label">Levels: </label>
                    <select name="" id="level-select" value={this.state.value} onChange={this.onLevelChange}>
                        { this.renderOptions() }
                    </select>
                </form>
            </div>
        );
    }
}

Levels.defaultProps = defaultProps;