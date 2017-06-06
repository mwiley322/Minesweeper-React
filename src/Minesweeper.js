import React, { Component } from 'react';
import './App.css';

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
      this.checkForWinner();
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
    var mineLocations = this.state.mineLocations;
    for (var i = 0; i < this.state.numMines; i++) {
      //place the mines on random x & y coordinates
      var cell = mineLocations[Math.floor(Math.random() * this.state.mineNums)][Math.floor(Math.random() * this.state.mineNums)];
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

  render() {
    return (
      <h1>{ this.state.gameStatus }</h1>
    );
  }
}
