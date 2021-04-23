import React from 'react';
import styled from 'styled-components';

const QOptionsContainer = styled.div`
  float: right;
`;

const QButton = styled.button`
  background: none!important;
  border: none;
  padding: 5px;
  text-decoration: underline;
  cursor: pointer;
`;

class QOptions extends React.Component {
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
    const { helpfulness } = this.props;
    const isHelpful = this.state.helpful;
    const helpfulClicked = helpfulness + 1;
    return (
      <QOptionsContainer className="options container">
        <span className="option helpful">
          Helpful?
          <QButton type="submit" onClick={this.onClickHelpful}>
            { isHelpful
              ? (
                <div>Yes <strong>({helpfulClicked})</strong></div>
              )
              : (
                <div>Yes ({helpfulness})</div>
              ) }
          </QButton>
        </span>
        { !this.state.reported
          ? <QButton className="option report" onClick={this.onClickReport}>Report</QButton>
          : <span> Reported </span> }
        <QButton type="submit" onClick={this.props.toggleAddAnswerModal}>  Add Answer</QButton>
      </QOptionsContainer>
    );
  }
}

export default QOptions;
