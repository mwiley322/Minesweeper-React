import React, { Component } from 'react';
import Face from './Face';

export default class Minesweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: 'playing', //initialized, playing, gameOver, winner
      level: 'beginner', //beginner, intermediate, expert
      numRows: 9,
      numColumns: 9,
      numMines: 10,
      numFlags: 0,
      numOpenedCells: 0,
      countdown: 0
    };
  }

  componentWillUpdate() {
    if (this.state.gameStatus === 'playing') {
      this.checkForGameStatus();
    }
  }

  setGameOver() {
    this.setState({
      status: 'gameOver'
    });
  }

  checkForGameStatus() {
    //if the number of mines added with the number of opened cells without bombs is greater than or equal to the amount of cells on the table, then game status can be set back to initialized in preparation for new game.
    if (this.state.numMines + this.state.numOpenedCells >= this.state.numRows * this.state.numColumns) {
      this.setState({
        status: 'initialized'
      });
    }
  }

  timeCountdown() {
    // clock only ticks after player has clicked on one cell and is playing
    if (this.state.numOpenedCells > 0 && this.state.gameStatus === 'playing') {
      this.setState({
        countdown: this.state.countdown + 1
      });
    }
  }

  countNumFlags(update) {
    this.setState({
      numFlags: this.state.numFlags + update
    });
  }

  placeMines() {
    let mines = this.state.numMines;
    var mineLocations = this.state.mineLocations;
    for (var i = 0; i < mines; i++) {
      //place the mines on random x & y coordinates
      var cell = mineLocations[Math.floor(Math.random() * mines)][Math.floor(Math.random() * mines)];
      if (cell.hasMine) {
        i--; //we want the mine to still be placed somewhere else
      } else {
        cell.hasMine = true; //otherwise we place it there and remember that it is there.
      }
    }
    //store information on mine location to the state
    this.setState({
      mineLocations: mineLocations
    });
  }

  addNumOpenedCells() {
    if(this.state.numOpenedCells === 0){
        this.interval = setInterval(this.countdown.bind(this), 1000);
    }
    this.setState({
        numOpenedCells : this.state.numOpenedCells++
    });
  }

  resetGame() {
    this.setState({
      gameStatus: 'playing',
      numFlags: 0,
      numOpenedCells: 0,
      countdown: 0
    });
  }

  setBeginner() {
    this.setState({
      gameStatus: 'playing',
      level: 'beginner',
      numRows: 9,
      numColumns: 9,
      numMines: 10,
      numFlags: 0,
      numOpenedCells: 0,
      countdown: 0
    });
  }

  setIntermediate() {
    this.setState({
      gameStatus: 'playing',
      level: 'intermediate',
      numRows: 16,
      numColumns: 16,
      numMines: 40,
      numFlags: 0,
      numOpenedCells: 0,
      countdown: 0
    });
  }

  setExpert() {
    this.setState({
      gameStatus: 'playing',
      level: 'expert',
      numRows: 16,
      numColumns: 30,
      numMines: 99,
      numFlags: 0,
      numOpenedCells: 0,
      countdown: 0
    });
  }

  render() {
    var _this = this;
    var level = () => {
      if (_this.state.level === 'beginner'){
        return (
          <div>
            <label><input type="radio" name="level" onChange={this.setBeginner.bind(this)} checked />beginner</label>
            <label><input type="radio" name="level" onChange={this.setIntermediate.bind(this)} />intermediate</label>
            <label><input type="radio" name="level" onChange={this.setExpert.bind(this)} />expert</label>
          </div>
        );
      } else if (_this.state.level === 'intermediate'){
          return (
            <div>
              <label><input type="radio" name="level" onChange={this.setBeginner.bind(this)} />beginner</label>
              <label><input type="radio" name="level" onChange={this.setIntermediate.bind(this)} checked />intermediate</label>
              <label><input type="radio" name="level" onChange={this.setExpert.bind(this)} />expert</label>
            </div>
          );
      } else if (_this.state.level === 'expert'){
          return (
            <div>
              <label><input type="radio" name="level" onChange={this.setBeginner.bind(this)} />beginner</label>
              <label><input type="radio" name="level" onChange={this.setIntermediate.bind(this)} />intermediate</label>
              <label><input type="radio" name="level" onChange={this.setExpert.bind(this)} checked />expert</label>
            </div>
          );
      }
    };
    return (
      <div>
        {level}
        <div>
          <span> {this.state.numMines - this.state.numFlags}</span>
          <span onClick={this.resetGame.bind(this)}>
            <span className="face"><Face gameStatus= {this.state.gameStatus} /></span>
          </span>
          <span> {this.state.countdown}</span>
        </div>
      </div>
    );
  }
}
