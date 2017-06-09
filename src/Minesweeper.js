import React from 'react';
import Face from './Face';
import Board from './Board';
import Level from './Level';
import './App.css';

export default class Minesweeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: 'playing', //initialized, playing, gameOver, add winner?
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
    //if the number of mines + number of revealed cells without bombs is greater than or equal to the amount of cells on the table,
    // then game status can be set back to initialized in preparation for new game.
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

  countNumFlags(flag) {
    this.setState({
      numFlags: this.state.numFlags + flag
    });
  }

  addNumRevealedCells() {
    //begin timer
    if(this.state.numRevealedCells === 0){
      this.interval = setInterval(this.timeCountdown.bind(this), 1000);
    }
    //begin tracking how many cells have been revealed
    this.setState({
      numRevealedCells : this.state.numRevealedCells++
    });
  }

  resetGame() {
    //reset timer
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
    return (
      <div>
        <Level level={this.state.level}
               setBeginner={ () => this.setBeginner() }
               setIntermediate={ () => this.setIntermediate() }
               setExpert={ () => this.setExpert() }
        />
        <div>
          <div id="gameInfo">
            <span id="gameInfoRight" title="Mines remaining on the board">
              Mines: {this.state.numMines - this.state.numFlags}
            </span>
            <span onClick={ () => this.resetGame() }>
              <span id="face" title="Restart game">
                <Face gameStatus={this.state.gameStatus} onClick={ () => this.resetGame() } />
              </span>
            </span>
            <span id="gameInfoLeft" title="Time spent this round">
              Timer: {this.state.countdown}
            </span>
          </div>
          <div>
            <Board numRevealedCells={this.state.numRevealedCells}
                   numMines={this.state.numMines}
                   numRows={this.state.numRows}
                   numColumns={this.state.numColumns}
                   setGameOver={ () => this.setGameOver() }
                   addNumRevealedCells={ () => this.addNumRevealedCells() }
                   countNumFlags={ () => this.countNumFlags() }
            />
          </div>
        </div>
      </div>
    );
  }
}
