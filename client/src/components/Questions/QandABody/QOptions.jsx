import React from 'react';

class QOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: false,
      helpfulCount: 0,
      reported: false,
    };
    this.onClickHelpful = this.onClickHelpful.bind(this);
    this.onClickReport = this.onClickReport.bind(this);
  }

  onClickHelpful() {
    this.setState({
      helpful: !this.state.helpful,
    });
  }

  onClickReport() {
    this.setState({
      reported: true,
    });
    this.props.onClickReport();
  }

  render() {
    const { helpfulness } = this.props;
    const isHelpful = this.state.helpful;
    const helpful = helpfulness + 1;
    return (
      <div className="options container">
        <span className="option helpful">
          Helpful?
          <button type="submit" onClick={this.onClickHelpful}>
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
