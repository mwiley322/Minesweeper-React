import React from 'react';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.createGameBoard(props)
    };
  }
}

//compares current props with new game props (in case of reset) and changes board if needed
componentWillReceiveProps(nextProps) {
  if (this.props.numOpenedCells > nextProps.numOpenedCells || this.props.numColumns !== nextProps.numColumns) {
    this.setState({
      rows: this.createGameBoard(nextProps);
    });
  }
}
