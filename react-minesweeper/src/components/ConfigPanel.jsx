import React from 'react';
import Grid from './Grid.jsx';

class ConfigPanel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            currentLevel: props.levels[0].index
        }
    }

    levelChange (event) {
        let index = parseInt(event.target.value, 10);
        this.setState({
            currentLevel: index
        });

        this.props.levelChange(index);
    }

    render () {
        return (
            <form>
                <label htmlFor="levels">Levels:</label>
                <select id="levels" value={this.state.currentLevel} onChange={(event) => this.levelChange(event)}>
                    {
                        this.props.levels.map((level) => {
                            return <option key={level.index} value={level.index}>{level.name}</option>
                        })
                    }
                </select>
            </form>
        );
    }
}

export default ConfigPanel