import React from 'react';
import './App.css';

export default class Minesweeper extends React.Component {
  render() {
    return (
      <div id="levels">
        <label className="levelSelect">
          <input type="radio"
                 name="level"
                 onChange={ () => this.props.setBeginner() }
                 checked={this.props.level === 'beginner'}
          />
          <span className="levelType">Beginner</span>
        </label>
        <label className="levelSelect">
          <input type="radio"
                  name="level"
                  onChange={() => this.props.setIntermediate() }
                  checked={this.props.level === 'intermediate'}
          />
          <span className="levelType">Intermediate</span>
        </label>
        <label className="levelSelect">
          <input type="radio"
                 name="level"
                 onChange={ () => this.props.setExpert() }
                 checked={this.props.level === 'expert'}
          />
          <span className="levelType">Expert</span>
        </label>
      </div>
    );
  }
}
