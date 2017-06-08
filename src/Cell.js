import React from 'react';
import './Cell.css';

export default class Cell extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        hasMine: props.cell.hasMine,
        hasFlag: props.cell.hasFlag,
        isRevealed: props.cell.isRevealed,
        numNeighboringMines: 0
      }
  }

//the next time this components receives props(likely when another cell is clicked, we will get its information)
  componentWillReceiveProps(nextProps) {
    this.setState({
      hasMine: nextProps.cell.hasMine,
      hasFlag: nextProps.cell.hasFlag,
      isRevealed: nextProps.cell.isRevealed,
      numNeighboringMines: nextProps.cell.numNeighboringMines
    })
  }

  reveal() {
    this.props.reveal(this.props.cell);
  }

  mark(e) {
    e.preventDefault();
    if(!this.state.isRevealed) {
      this.props.mark(this.props.cell);
    }
  }

  render() {
    let cell = (props) => {
      if(props.isRevealed) {
        if(props.hasMine) {
          return (
            <div className="coveredCell revealedCell">
              <span className="mineCell">mine</span>
            </div>
          );
        } else {
          return (
            <div className="coveredCell revealedCell">
              <span>{props.numNeighboringMines}</span>
            </div>
          );
        }
      } else if (props.hasFlag) {
        return (
          <div className="coveredCell revealedCell">
            <span className="flagCell">flag</span>
          </div>
        );
      } else {
        return (
          <div className="coveredCell"></div>
        );
      }
    }
    return (
      <td className="cell" onClick={ () => this.reveal() } onContextMenu={ () => this.mark() }>
        {cell}
      </td>
    );
  }
}
