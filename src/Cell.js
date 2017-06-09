import React from 'react';
import './Cell.css';

export default class Cell extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        x: props.cell.x,
        y: props.cell.y,
        hasMine: props.cell.hasMine,
        hasFlag: props.cell.hasFlag,
        isRevealed: props.cell.isRevealed,
        numNeighboringMines: 0
      }
  }

//the next time this components receives props(likely when another cell is clicked, we will get its information)
  componentWillReceiveProps(nextProps) {
    this.setState({
      x: nextProps.cell.x,
      y: nextProps.cell.y,
      hasMine: nextProps.cell.hasMine,
      hasFlag: nextProps.cell.hasFlag,
      isRevealed: nextProps.cell.isRevealed,
      numNeighboringMines: nextProps.cell.numNeighboringMines
    })
  }

  mark(e) {
    e.preventDefault();
    if(!this.state.isRevealed) {
      this.props.mark(this.props.cell);
    }
  }

  findCell() {
    // if(this.state.isRevealed) {
      if(this.state.hasMine) {
        return (
          <div className="coveredCell revealedCell">
            <span className="mineCell">!</span>
          </div>
        );
        //this parameter goes below with the commented out portion
      } else if (this.state.hasFlag) {
        return (
          <div className="coveredCell revealedCell">
            <span className="flagCell">flag</span>
          </div>
        );
      } else {
        if (this.state.numNeighboringMines > 0) {
          return (
            <div className="coveredCell revealedCell">
              <span>{this.state.numNeighboringMines}</span>
            </div>
          );
        } else {
          return (
            <div className="coveredCell revealedCell">
              <span>-</span>
            </div>
          );
        }
      }

    // } else {
    //   return (
    //     <div className="coveredCell"></div>
    //   );
    // }
  }



  render() {
    return (
      <td className="cell" onClick= {() => this.props.reveal(this.props.cell) } onContextMenu={ () => this.mark(this.props.cell) }>
        {this.findCell()}
      </td>
    );
  }
}
