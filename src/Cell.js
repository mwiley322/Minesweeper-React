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

  findCell() {
    let numMines = this.state.numNeighboringMines;
    if(this.state.isRevealed) {
      if(this.state.hasMine) {
        return (
          <div className="coveredCell revealedCell">
            <span className="mineCell">!</span>
          </div>
        );
      } else {
        return (
          <div className="coveredCell revealedCell">
            <span>{numMines > 0 ? numMines : '-'}</span>
          </div>
        );
      }
    } else if (!this.state.isRevealed && this.state.hasFlag) {
      return (
        <div className="coveredCell revealedCell">
          <span className="flagCell">.</span>
        </div>
      );
    } else {
      return (
        <div className="coveredCell"></div>
      );
    }
  }

  render() {
    return (
      <td className="cell" onClick={ () => this.props.reveal(this.props.cell) } onContextMenu={ (e) => this.props.mark(e, this.props.cell) }>
        {this.findCell()}
      </td>
    );
  }
}
