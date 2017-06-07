import React from 'react';
import Cell from './Cell'


export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cells : props.cells
    };
  }

componentWillMount() {
  console.log(this.state.cells);
}

  componentWillReceiveProps(nextProps) {
    this.setState({
      cells: nextProps.cells
    });
  }

  render() {
    var Cells = this.state.cells.map((cell, index) => {
      return (
        <Cell key={index.toString()} cell={[cell]} reveal={this.props.reveal} mark={this.props.mark} />
      );
    });
    return (
      <tbody>
        <tr>
          {Cells}
        </tr>
      </tbody>
    )
  }
}
