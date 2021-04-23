
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
  color: black;
  height: 15%;
  float: right;
  border-radius: 10px 10px 0 0;
  padding: 10px 15px;
  background-color: white;
  display: flex;
  flex-direction: row;
  margin: 10 auto 10 auto;
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
      markedHelpful: false,
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
    const { markedHelpful } = this.state;
    this.setState({
      markedHelpful: !markedHelpful,
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
    const { toggleAddAnswerModal, toggleImageCarouselModal} = this.props;
    const ansArr = sortByAHelpful(answers);
    const ansDisplayed = ansArr.slice(0, numDisplayed);
    const lengthTest = {
      moreToDisplay: (ansArr.length > 2 && ansDisplayed.length < ansArr.length),
      currentlyDisplayingAll: (ansDisplayed.length >= ansArr.length && ansArr.length > 2),
    };
    return (
      <QuestionDiv>

        <QuestionHeader>
          <div className="q icon">
            <h3>
              Q:
            </h3>
          </div>

          <div className="q text">
            <h3>
              {question_body}
            </h3>
          </div>

          <div className="q options">
            <QOptions
              helpfulness={question_helpfulness}
              onClickHelpful={this.onClickHelpful}
              onClickReport={this.onClickReport}
              toggleAddAnswerModal={toggleAddAnswerModal}
            />
          </div>
        </QuestionHeader>

        <AnswerWrapper>
          <div className="a icon">
            <h3>
              A:
            </h3>
          </div>

          <span className="answer-display">
            { ansDisplayed.map((answer, index) => (
              answer.body
              ? <ABody
                  answer={answer}
                  onClickReport={this.onClickReport}
                  key={`answer ${index}`}
                  toggleImageCarouselModal={toggleImageCarouselModal}
                />
              : null
            ))}
            { lengthTest.moreToDisplay
              ? <LoadOption type="submit" onClick={this.onCLickDisplay}>See More Answers</LoadOption>
              : null}
            { lengthTest.currentlyDisplayingAll
              ? <LoadOption type="submit" onClick={this.onClickCollapse}>No More Answers to Display... Collapse?</LoadOption>
              : null }
          </span>

        </AnswerWrapper>

      </QuestionDiv>
    );
  }
}

export default QBody;
