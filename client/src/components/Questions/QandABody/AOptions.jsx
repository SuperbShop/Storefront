import React from 'react';

class AOptions extends React.Component {
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
        <span className="option username">User1234</span>
        <span className="option date">Jan 6, 2020</span>
        <span className="option helpful">
          Helpful?
          <button type="submit" onClick={this.onClick}>
            Yes (
            {helpfulCount}
            )
          </button>
        </span>
        <span className="option report">Report</span>
      </div>
    );
  }
}

export default AOptions;
