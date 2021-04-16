import React from 'react';

class QOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: false,
      helpfulCount: 0,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      helpful: true,
    });
  }

  render() {
    const { helpfulCount } = this.state;
    return (
      <div className="options container">
        <span className="option helpful">
          Helpful?
          <button type="submit" onClick={this.onClick}>
            Yes (
            {helpfulCount}
            )
          </button>
        </span>
        <span className="option report"><p>Add Answer</p></span>
      </div>
    );
  }
}

export default QOptions;
