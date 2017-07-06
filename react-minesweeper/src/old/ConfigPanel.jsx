import React from 'react';

const defaultProps = {
    levels: [],
    levelIndex: 0
}; 

export default class ConfigPanel extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            levelIndex: this.props.levelIndex
        };

        this.onLevelChange = this.onLevelChange.bind(this);
    }
    
    componentDidUpdate (prevProps, prevState) {
        if (prevState.levelIndex !== this.state.levelIndex) {
            this.props.levelChanged(this.state.levelIndex);
        }
    }

    onLevelChange (event) {
        const index = parseInt(event.target.value, 10);
        this.setState({
            levelIndex: index
        });
    }

    render () {
        return (
            <div id="levels">
                <form>
                    <label htmlFor="level-select" id="levels-text">Levels: </label>
                    <select name="" id="level-select" value={this.state.levelIndex} onChange={this.onLevelChange}>
                        {this.props.levels.map((level) => {
                            return <option key={level.index} value={level.index}>{level.name}</option>
                        })}
                    </select>
                </form>
            </div>
        );
    }
}

ConfigPanel.defaultProps = defaultProps;

