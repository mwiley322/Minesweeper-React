import React from 'react';

export default class Face extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var face = this.props.gameStatus === 'winner'   ? 'fa fa-thumbs-o-up' :
               this.props.gameStatus === 'gameOver' ? 'fa fa-frown-o'     :
                                                  'fa fa-smile-o';

    return (
      <div className="face" onClick={this.props.onClick}>
        <i className={icon} />
      </div>
    )
  }
}
