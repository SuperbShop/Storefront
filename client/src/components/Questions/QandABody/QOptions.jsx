import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const QOptionsContainer = styled.div`
  display: flex-grid;
  flex-direction: column;
  font-size: 0.7em;
  position: relative;
  padding: 5px 0 0 0;
`;

const QButton = styled.button`
  background: none!important;
  border: none;
  padding: 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ReportButton = styled.button`
  background: none!important;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

class QOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: false,
      helpfulClicked: false,
      reported: false,
    };
    this.onClickHelpful = this.onClickHelpful.bind(this);
    this.onClickReport = this.onClickReport.bind(this);
    this.launchModal = this.launchModal.bind(this);
  }

  onClickHelpful() {
    const { question_id } = this.props;
    const { helpful, helpfulClicked } = this.state;
    const url = `/api/questions/${question_id}/helpful`;
    if (!helpful && !helpfulClicked) {
      axios.put(url)
        .then(() => {
          console.log(question_id, ' Marked Helpful');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.setState({
      helpful: !helpful,
      helpfulClicked: true,
    });
  }

  onClickReport() {
    const { question_id } = this.props;
    const url = `/api/questions/${question_id}/report`;
    axios.put(url)
      .then(() => {
        this.setState({
          reported: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  launchModal() {
    const {
      toggleAddAnswerModal,
      question_id,
      question,
      bindSubmit
    } = this.props;
    toggleAddAnswerModal(question_id, question);
    bindSubmit();
  }

  render() {
    const { helpfulness } = this.props;
    const { helpful, reported } = this.state;
    const helpfulClicked = helpfulness + 1;
    return (
      <QOptionsContainer className="options container">
        <span className="option helpful">
          Helpful?
          <QButton type="submit" onClick={this.onClickHelpful}>
            { helpful
              ? (
                <div>
                  Yes
                  <strong>
                    (
                    {helpfulClicked}
                    )
                  </strong>
                </div>
              )
              : (
                <div>
                  Yes (
                  {helpfulness}
                  )
                </div>
              ) }
          </QButton>
          { !reported
            ? (
              <ReportButton
                className="option report"
                onClick={this.onClickReport}
              >
                Report
              </ReportButton>
            )
            : <span>Reported</span> }
        </span>
        <QButton type="submit" onClick={this.launchModal}>  Add Answer</QButton>
      </QOptionsContainer>
    );
  }
}

export default QOptions;
