import React from 'react';
import Cell from './Cell'


export default class Row extends React.Component {
  constructor(props) {
    super(props);
    var cellsArr = props.cells.concat([props.cells]);
    this.state = {
        cells : cellsArr
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cells: nextProps.cells
    });
  }

  render() {
    var Cells = this.state.cells.map((cell) => {
      return (
        <Cell cell={cell} reveal={this.props.reveal} mark={this.props.mark} />
      );
    });
    return (
      <tr>
        {Cells}
      </tr>
    )
  }
}
