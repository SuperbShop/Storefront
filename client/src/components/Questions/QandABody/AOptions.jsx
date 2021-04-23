import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const AOptionsContainer = styled.div`
  color: black;
  width: 45%;
  height: 15%;
  display: inline;
  padding: 5px;
`;

const AOption = styled.button`
  background: none!important;
  border: none;
  padding: 5px;
  color: black;
  text-decoration: underline;
  cursor: pointer;
`;

class AOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: false,
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
    const { answerer, date, helpfulness } = this.props;
    const isHelpful = this.state.helpful;
    const helpfulClicked = helpfulness + 1;
    return (
      <AOptionsContainer className="options container">
        <span className="option username">{answerer}</span>
        <span className="option date">{moment(date, 'YYYY-MM--DD HH:mm:ss').fromNow()}</span>
        <span className="option helpful">
          Helpful?
          <AOption type="submit" onClick={this.onClickHelpful}>
            { isHelpful
              ? (<div>Yes (<strong>{helpfulClicked}</strong>)</div>)
              : (<div>Yes ({helpfulness})</div>)
            }
          </AOption>
        </span>
        { !this.state.reported
          ? <AOption className="option report" onClick={this.onClickReport}>Report</AOption>
          : <span>Reported</span> }
      </AOptionsContainer>
    );
  }
}

export default AOptions;
