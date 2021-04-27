import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const OptionsContainer = styled.div`
  display: flex-grid;
  font-size: 0.7em;
  position: relative;
  grid-template-columns: 1fr 1fr;

`;

const AOptionItem = styled.div`
  float: right;
  background: none!important;
  border: none;
  color: black;
  cursor: pointer;
  margin-right: 10px;
`;

const AOptionButton = styled.button`
  background: none!important;
  border: none;
  color: black;
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

  componentWillUnmount() {
    this.setState({
      helpful: false,
      reported: false,
    });
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
      <OptionsContainer className="options container">
        <AOptionItem className="option username">{answerer}</AOptionItem>
        <AOptionItem className="option date">{moment(date, 'YYYY-MM--DD HH:mm:ss').format('MMMM Do YYYY')}</AOptionItem>
        <AOptionItem className="option helpful">
          <AOptionButton type="submit" onClick={this.onClickHelpful}>
            { isHelpful
              ? (<div>Helpful? Yes (<strong>{helpfulClicked}</strong>)</div>)
              : (<div>Helpful? Yes ({helpfulness})</div>)}
          </AOptionButton>
        </AOptionItem>
        { !this.state.reported
          ? <AOptionButton className="option report" onClick={this.onClickReport}>Report</AOptionButton>
          : <span>Reported</span> }
      </OptionsContainer>
    );
  }
}

export default AOptions;
