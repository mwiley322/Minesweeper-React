import React from 'react';
import Face from './Face';
import Board from './Board';
import './App.css';

export default class Minesweeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: 'playing', //initialized, playing, gameOver, winner
      level: 'beginner', //beginner, intermediate, expert
      numRows: 9,
      numColumns: 9,
      numMines: 10,
      numFlags: 0,
      numRevealedCells: 0,
      countdown: 0
    };

  }

  componentWillUpdate() {
    if (this.state.gameStatus === 'playing') {
      this.checkForGameStatus();
    }
  }

  componentWillMount() {
      this.interval = [];
  }

  setGameOver() {
    this.setState({
      status: 'gameOver'
    });
  }

  checkForGameStatus() {
    //if the number of mines added with the number of revealed cells without bombs is greater than or equal to the amount of cells on the table, then game status can be set back to initialized in preparation for new game.
    if (this.state.numMines + this.state.numRevealedCells >= this.state.numRows * this.state.numColumns) {
      this.setState({
        status: 'initialized'
      });
    }
  }

  timeCountdown() {
    // clock only ticks after player has clicked on one cell and is playing
    if (this.state.numRevealedCells > 0 && this.state.gameStatus === 'playing') {
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

  // placeMines() {
  //   var mineLocations = this.state.mineLocations;
  //   for (var i = 0; i < this.state.numMines; i++) {
  //     //place the mines on random x & y coordinates
  //     var cell = mineLocations[Math.floor(Math.random() * this.state.numRows)][Math.floor(Math.random() * this.state.numColumns)];
  //     if (cell.hasMine) {
  //       i--; //we want the mine to still be placed somewhere else
  //     } else {
  //       cell.hasMine = true; //otherwise we place it there and remember that it is there.
  //     }
  //   }
  //   //store information on mine location to the state
  //   this.setState({
  //     mineLocations: mineLocations
  //   });
  // }

  addNumRevealedCells() {
    if(this.state.numRevealedCells === 0){
      this.interval = setInterval(this.timeCountdown.bind(this), 1000);
    }
    this.setState({
      numRevealedCells : this.state.numRevealedCells++
    });
  }


  resetGame() {
    clearInterval(this.interval);
    this.setState({
      gameStatus: 'playing',
      numFlags: 0,
      numRevealedCells: 0,
      countdown: 0
    });
  }

  setBeginner() {
    clearInterval(this.interval);
    this.setState({
      gameStatus: 'playing',
      level: 'beginner',
      numRows: 9,
      numColumns: 9,
      numMines: 10,
      numFlags: 0,
      numRevealedCells: 0,
      countdown: 0
    });
  }

  setIntermediate() {
    clearInterval(this.interval);
    this.setState({
      gameStatus: 'playing',
      level: 'intermediate',
      numRows: 16,
      numColumns: 16,
      numMines: 40,
      numFlags: 0,
      numRevealedCells: 0,
      countdown: 0
    });
  }

  setExpert() {
    clearInterval(this.interval);
    this.setState({
      gameStatus: 'playing',
      level: 'expert',
      numRows: 16,
      numColumns: 30,
      numMines: 99,
      numFlags: 0,
      numRevealedCells: 0,
      countdown: 0
    });
  }

  render() {
    var level = this.state.level;
    return (
      <div>
        <div>
          <label className="levelSelect">
            <input type="radio"
                   name="level"
                   onChange={ () => this.setBeginner() }
                   checked={level === 'beginner'}
            />
            <span className="levelType">Beginner</span>
          </label>
          <label className="levelSelect">
            <input type="radio"
                    name="level"
                    onChange={() => this.setIntermediate() }
                    checked={level === 'intermediate'}
            />
            <span className="levelType">Intermediate</span>
          </label>
          <label className="levelSelect">
            <input type="radio"
                   name="level"
                   onChange={ () => this.setExpert() }
                   checked={level === 'expert'}
            />
            <span className="levelType">Expert</span>
          </label>
        </div>
        <div>
          <div className="gameInfo">
            <span className="gameInfoRight">{this.state.numMines - this.state.numFlags}</span>
            <span onClick={ () => this.resetGame() }>
              <span className="face"><Face gameStatus={this.state.gameStatus} /></span>
            </span>
            <span className="gameInfoLeft">{this.state.countdown}</span>
          </div>
          <div>
            <Board numRevealedCells={this.state.numRevealedCells} numMines={this.state.numMines} numRows={this.state.numRows} numColumns={this.state.numColumns} setGameOver={ () => this.setGameOver() } addNumRevealedCells={ () => this.addNumRevealedCells() } countNumFlags={ () => this.countNumFlags() } />
          </div>
        </div>
      </div>
    );
  }
}
