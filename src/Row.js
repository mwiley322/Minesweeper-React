import React from 'react';
import Cell from './Cell'
import './App.css';

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells : props.cells
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     cells: nextProps.cells
  //   });
  // }
  //
  reveal(cell) {
    this.props.reveal(cell);
  }
  //
  // mark() {
  //   this.props.mark();
  // }



  render() {
    let cells = this.props.cells.map((cell, index) => {
      return (
        <Cell key={index.toString()} cell={cell} reveal={this.reveal.bind(this, cell)} mark={ () => this.mark() }/>
      );
    });
    return (
      <tbody>
        <tr>
          {cells}
        </tr>
      </tbody>
    )
  }
}
