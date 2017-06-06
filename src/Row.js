import React from 'react';
import Cell from './Cell';


export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: props.cells
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cells: nextProps.cells
    });
  }

  render() {
    var Cells = this.state.cells.map((cell) => {
      return (
        <Cell cell={cell} reveal={this.props.reveal} mark={this.props.reveal} />
      );
    });
    return (
      <tr>
        {Cells}
      </tr>
    )
  }
}
