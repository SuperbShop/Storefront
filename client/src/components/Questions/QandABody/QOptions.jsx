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
      helpful: !this.state.helpful,
    });
    console.log(this.props);
  }

  render() {
    const { helpfulness } = this.props;
    const isHelpful = this.state.helpful;
    const helpful = helpfulness + 1;
    return (
      <div className="options container">
        <span className="option helpful">
          Helpful?
          <button type="submit" onClick={this.onClick}>
            { isHelpful
              ? (
                <h3>
                  Yes (
                  {helpful}
                  )
                </h3>
              )
              : (
                <h3>
                  Yes (
                  {helpfulness}
                  )
                </h3>
              ) }
          </button>
        </span>
        { !this.state.reported
          ? <button className="option report" onClick={this.onClickReport}>Report</button>
          : <h3>Reported</h3> }
        <span className="option addAnswer"><p>Add Answer</p></span>
      </div>
    );
  }
}

export default QOptions;
