/* eslint-disable react/prop-types */
import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import QOptions from './QOptions';
import ABody from './ABody';

const sortByAHelpful = function (obj) {
  const copy = Object.values(obj);
  copy.sort((answer, next) => ((
    answer.helpfulness > next.helpfulness
  ) ? -1 : 1));
  return copy;
};

const QuestionDiv = styled.div`
  background-color: white;
  border: 5px solid white;
  border-radius: 10px;
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 15px auto;
`;

const QuestionHeader = styled.div`
  color: white;
  height: 15%;
  float: right;
  border-radius: 10px 10px 0 0;
  padding: 10px 15px;
  background-color: black;
  display: flex;
  flex-direction: row;
`;

const AnswerWrapper = styled.div`
  background-color: white;
  width: 100%;
  margin: 0 auto;
  max-height: 300px;
  overflow: scroll;
`;

const LoadOption = styled.button`
  background: none!important;
  border: none;
  padding: 5px;
  color: black;
  text-decoration: underline;
  cursor: pointer;
  margin: 0 15px;
`;

class QBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 'default',
      numDisplayed: 2,
      reported: false,
      helpful: false,
    };
    this.onCLickDisplay = this.onClickDisplay.bind(this);
    this.onClickReportQ = this.onClickReportQ.bind(this);
    this.onClickReportA = this.onClickReportA.bind(this);
    this.onClickCollapse = this.onClickCollapse.bind(this);
    this.report = this.report.bind(this);
  }

  componentDidMount() {
    const { question } = this.props;
    this.setState({ question });
  }

  onClickDisplay() {
    this.displayMore();
  }

  onClickHelpful() {
    const { helpful } = this.state;
    this.setState({
      helpful: !helpful,
    });
  }

  onClickReportQ() {
    this.report();
    alert('REPORTED');
  }

  onClickReportA() {
    alert('REPORTED');
  }

  onClickCollapse() {
    this.collapse();
  }

  report() {
    this.props.report();
    this.setState({
      reported: true,
    });
  }

  displayMore() {
    const { numDisplayed } = this.state;
    const { question } = this.props;
    const length = question.answers.length;
    this.setState({
      numDisplayed: length,
    });
  }

  collapse() {
    this.setState({
      numDisplayed: 2,
    });
  }

  render() {
    const { numDisplayed } = this.state;
    const {
      question_body,
      answers,
      question_helpfulness,
    } = this.props.question;
    const ansArr = sortByAHelpful(answers);
    const ansDisplayed = ansArr.slice(0, numDisplayed);
    // If the number of answers displayed is less than the total available
    const lengthTest = {
      moreToDisplay: ansArr.length > 2 && ansDisplayed.length < ansArr.length,
      currentlyDisplayingAll: ansDisplayed.length >= ansArr.length && ansArr.length > 2,
      test3: ansArr.length === 1,
    };
    return (
      <QuestionDiv>
        <QuestionHeader>
          <span>
            <h3>
              Q:
              {question_body}
            </h3>
          </span>
          <div className="options-upper">
            <div className="QOptions">
              <QOptions
                helpfulness={question_helpfulness}
                onClickHelpful={this.onClickHelpful}
                onClickReport={this.onClickReport}
                toggleAddAnswerModal={this.props.toggleAddAnswerModal}
              />
            </div>
          </div>
        </QuestionHeader>
        <AnswerWrapper>
          <span>
            <h3>
              A:
            </h3>
            { ansDisplayed.map((answer, index) => (
              <ABody
                answer={answer}
                onClickReport={this.onClickReport}
                key={`answer ${index}`}
                toggleImageCarouselModal={this.props.toggleImageCarouselModal}
              />
            ))}
            { lengthTest.moreToDisplay
              ? <LoadOption type="submit" onClick={this.onCLickDisplay}>See More Answers</LoadOption>
              : <div></div>}
            { lengthTest.currentlyDisplayingAll
              ? <LoadOption type="submit" onClick={this.onClickCollapse}>No More Answers to Display... Collapse?</LoadOption>
              : <div></div>}
          </span>
        </AnswerWrapper>
      </QuestionDiv>
    );
  }
}

export default QBody;
