import React from 'react';
import moment from 'moment';

class AOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: false,
      helpfulCount: 0,
      reported: false,
    };
    this.onClick = this.onClick.bind(this);
    this.onClickReport = this.onClickReport.bind(this);
  }

  onClick() {
    this.setState({
      helpful: !this.state.helpful,
    });
    console.log(this.props);
  }

  onClickReport() {
    this.setState({
      reported: true,
    });
    this.props.onClickReport();
  }

  render() {
    const { answerer } = this.props;
    const { date } = this.props;
    const { helpfulness } = this.props;
    const helpful = helpfulness + 1;
    const isHelpful = this.state.helpful;
    // console.log(this.props);
    return (
      <div className="options container">
        <span className="option username">{answerer}</span>
        <span className="option date">{moment(date, 'YYYY-MM--DD HH:mm:ss').fromNow()}</span>
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
      </div>
    );
  }
}

export default AOptions;
