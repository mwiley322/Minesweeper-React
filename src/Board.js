import React from 'react';
import Row from './Row';

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

    createGameBoard(props) {
      var gameBoard = [];

      for ( var row = 0; row < props.numRows; row++ ) {
        for ( var column = 0; column < props.numColumns; column++ ) {
          gameBoard.push({
            x: column,
            y: row,
            numNeighboringMines: 0,
            isRevealed: false,
            hasMine: false,
            hasFlag: false
          });
        }
      }


      // for (var i = 0; i < props.numMines; i++) {
      //   var cell = gameBoard[ Math.floor(Math.random() * props.numRows) ][ Math.floor(Math.random() * props.numColumns) ];
      //   console.log(cell)
      //   if (cell.hasMine) {
      //     i--;
      //   } else {
      //     cell.hasMine = true;
      //   }
      // }

      return gameBoard;
    }

    reveal(cell) {
      var num = this.countMines(cell);
      var rows = this.state.rows;
      //if the cell hasn't already been clicked and revealed, add it to the counter that checks whether the game status should change
      if (!rows[cell.y][cell.x].isRevealed) {
        this.props.addNumRevealedCells();
      }
      //cell is revealed and visible
      rows[cell.y][cell.x].isRevealed = true;
      rows[cell.y][cell.x].numNeighboringMines = cell.hasMine ? "b" : num;
      this.setState({
        rows : rows
      });
      if (rows[cell.y][cell.x].hasFlag) {
        rows[cell.y][cell.x].hasFlag = false;
        this.props.checkNumFlags(-1);
      }
      //if the cell does not have any neighboring mines, reveal those around it.
      if(!cell.hasMine && num === 0){
        this.revealAround(cell);
      }
      //when player hits a mine, it is game over regardless of how far they have gone.
      if(cell.hasMine){
        this.props.setGameOver();
      }
    }

    mark(cell) {
      var rows = this.state.rows
      var thisCell = rows[cell.y][cell.x];
      thisCell.hasFlag = !thisCell.hasFlag;
      //update the rows
      this.setState({
        rows : rows
      });
      this.props.checkNumFlags(thisCell.hasFlag ? 1 : -1);
    }

    countMines(cell) {
      var neighboringMines = 0;
        for(var row = -1; row <= 1; row++){
          for(var col = -1; col <= 1; col++){
            if(cell.y-0 + row >= 0 && cell.x-0 + col >= 0 && cell.y-0 + row < this.state.rows.length && cell.x-0 + col < this.state.rows[0].length && this.state.rows[cell.y-0 + row][cell.x-0 + col].hasMine && !(row === 0 && col === 0)){
              neighboringMines ++;
            }
          }
        }
      return neighboringMines;
    }

    revealAround(cell){
      var rows = this.state.rows;
      for(var row = -1; row <= 1; row++){
        for(var col = -1; col <= 1; col++){
          if(cell.y-0 + row >= 0 && cell.x-0 + col >= 0 && cell.y-0 + row < this.state.rows.length && cell.x-0 + col < this.state.rows[0].length && !this.state.rows[cell.y-0 + row][cell.x-0 + col].hasMine && !this.state.rows[cell.y-0 + row][cell.x-0 + col].isRevealed){
            this.reveal(rows[cell.y-0 + row][cell.x-0 + col]);
          }
        }
      }
    }

  render() {

    var Rows = this.state.rows.map((row) => {
      return(
        <Row cells={row} open={this.reveal.bind(this)} mark={this.mark.bind(this)} />
      );
    });

    return (
      <table>
        <tbody>
            {Rows}
        </tbody>
      </table>
    );
  }
}
