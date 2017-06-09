import React from 'react';
import Row from './Row';
import './App.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.createGameBoard(props)
    };
  }

  //compares current props with new game props (in case of reset) and changes board if needed
  componentWillReceiveProps(nextProps) {
    if (this.props.numRevealedCells > nextProps.numRevealedCells || this.props.numColumns !== nextProps.numColumns) {
      this.setState({
        rows: this.createGameBoard(nextProps)
      });
    }
  }

  //this function puts all cells in their location & sets the mines randomly throughout
  createGameBoard(props) {
    var gameBoard = [];
    //create a cell object with properties for each x-y coordinate on the gameboard
    for ( var row = 0; row < props.numRows; row++ ) {
      //each new row needs a new array to avoid a single line of the cells
      gameBoard.push([]);
      for ( var column = 0; column < props.numColumns; column++ ) {
        gameBoard[row].push({
          x: column,
          y: row,
          numNeighboringMines: 0,
          isRevealed: false,
          hasMine: false,
          hasFlag: false
        });
      }
    }
    // place mines randomly throughout the gameboard
    for ( var i = 0; i < props.numMines; i++ ) {
      var cell = gameBoard[ Math.floor(Math.random() * props.numRows) ][ Math.floor(Math.random() * props.numColumns) ];
      if (cell.hasMine) {
        //decrement the counter so that it just goes and finds another place to put that mine
        i--;
      } else {
        //place the mine there and attach its key value
        cell.hasMine = true;
      }
    }
    return gameBoard;
  }

  countMines(cell) {
    var neighboringMines = 0;
    console.log('IN COUNT MINE', cell)
    //the rows and columns measure 3 across on the x-axis, -1 on the left, 0 in center, 1 on the right and likewise up and down for y axis
    let rows = this.state.rows;
    for ( var row = -1; row <= 1; row++ ) {
      for ( var col = -1; col <= 1; col++ ) {
        if ( cell.y - 0 + row >= 0
          && cell.x - 0 + col >= 0
          && cell.y - 0 + row < rows.length
          && cell.x - 0 + col < rows[0].length
          && rows[cell.y - 0 + row][cell.x - 0 + col].hasMine
          && !(row === 0 && col === 0)) {
            neighboringMines ++;
        }
      }
    }
    this.numNeighboringMines = neighboringMines;
    return neighboringMines;
  }


    reveal(cell) {
      console.log('REVEAL', cell);
      //when player hits a mine, it is game over regardless of how far they have gone.
      if (cell.hasMine) {
        this.props.setGameOver();
      }
      // var num = this.countMines(cell);
      var rows = this.state.rows;
      //if the cell hasn't already been clicked and revealed, add it to the counter that checks whether the game status should change
      // if (!rows[cell.y][cell.x].isRevealed) {
      //   props.addNumRevealedCells();
      // }
      //cell is revealed and visible
      rows[cell.y][cell.x].isRevealed = true;
      // rows[cell.y][cell.x].numNeighboringMines = cell.hasMine ? "!" : num;
      this.setState({
        rows : rows
      });
      // if (rows[cell.y][cell.x].hasFlag) {
      //   rows[cell.y][cell.x].hasFlag = false;
      //   props.countNumFlags(-1);
      // }
      //if the cell does not have any neighboring mines, reveal those around it.
      // if (!cell.hasMine && num === 0) {
      //   this.revealAround(cell);
      // }

    }

    // mark(cell) {
    //   var rows = this.state.rows
    //   var thisCell = rows[cell.y][cell.x];
    //   thisCell.hasFlag = !thisCell.hasFlag;
    //   //update the rows
    //   this.setState({
    //     rows : rows
    //   });
    //   this.props.countNumFlags(thisCell.hasFlag ? 1 : -1);
    // }



    //if the player hits a cell that has 0 then it must reveal all of those that it touches if they have 0 recursively until it hits a wall of cells with neighboring mines
    // revealAround(cell, props){
    //   var rows = this.state.rows;
    //
    //   for ( var row = -1; row <= 1; row++ ) {
    //     for ( var col = -1; col <= 1; col++ ) {
    //       if (cell.y - 0 + row >= 0
    //           && cell.x - 0 + col >= 0
    //           && cell.y - 0 + row < rows.length
    //           && cell.x - 0 + col < rows[0].length
    //           && !rows[cell.y - 0 + row][cell.x - 0 + col].hasMine
    //           && !rows[cell.y - 0 + row][cell.x - 0 + col].isRevealed) {
    //             this.reveal(rows[cell.y - 0 + row][cell.x - 0 + col], props);
    //       }
    //     }
    //   }
    // }

  render() {
    var Rows = this.state.rows.map((row, index) => {
      return(
        <Row key={index.toString()} cells={row} reveal={this.reveal.bind(this)} mark={this.mark} />
      );
    });
    return (
      <table id="gameBoard">
        {Rows}
      </table>
    );
  }
}
