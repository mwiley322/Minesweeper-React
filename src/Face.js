import React from 'react';

export default class Face extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.gameStatus === 'winner') {
      var face = 'fa fa-thumbs-o-up';
    } else if (this.props.gameStatus === 'gameOver') {
      face = 'fa fa-frown-o';
    } else {
      face = 'fa fa-smile-o';
    }
    
    return (
      <i className={face} />
    )
  }
}
