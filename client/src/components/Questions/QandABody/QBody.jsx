import React from 'react';
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
  width: 100%;
  margin: 0 auto;
`;

const QuestionHeader = styled.div`
  color: black;
  display: grid;
  margin: 10 auto 10 auto;
  grid-template-columns: 1fr 15fr 5fr;
`;

const AnswerWrapper = styled.div`
  display: grid;
  background-color: white;
  margin: 0 auto;
  width: auto;
  max-height: 300px;
  overflow: scroll;
  grid-template-columns: 1fr 20fr;
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

const QuestionBody = styled.div`
  display: grid;
  margin: 0 0 15px 0;
`;

const QAIcon = styled.div`
  width: 50px;
`;

class QBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 'default',
      numDisplayed: 2,
      markedHelpful: false,
    };
    this.onClickDisplay = this.onClickDisplay.bind(this);
    this.onClickCollapse = this.onClickCollapse.bind(this);
    this.displayMore = this.displayMore.bind(this);
  }

  componentDidMount() {
    const { question } = this.props;
    this.setState({ question });
  }

  onClickDisplay() {
    console.log(this);
    this.displayMore();
  }

  onClickHelpful() {
    const { markedHelpful } = this.state;
    this.setState({
      markedHelpful: !markedHelpful,
    });
  }

  onClickCollapse() {
    this.collapse();
  }

  displayMore() {
    const { question } = this.props;
    const { length } = question.answers;
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
    const { toggleAddAnswerModal, toggleImageCarouselModal } = this.props;
    const ansArr = sortByAHelpful(answers);
    const ansDisplayed = ansArr.slice(0, numDisplayed);
    const lengthTest = {
      hasAnswers: ansArr.length > 0,
      moreToDisplay: (ansArr.length > 2 && ansDisplayed.length < ansArr.length),
      currentlyDisplayingAll: (ansDisplayed.length >= ansArr.length && ansArr.length > 2),
    };

    return lengthTest.hasAnswers
      ? (
        <QuestionDiv>

          <QuestionHeader>
            <QAIcon className="q icon">
              <h3>
                Q:
              </h3>
            </QAIcon>

            <QuestionBody className="q text">
              <h3>
                {question_body}
              </h3>
            </QuestionBody>

            <div className="q options">
              <QOptions
                helpfulness={question_helpfulness}
                onClickHelpful={this.onClickHelpful}
                onClickReport={this.report}
                toggleAddAnswerModal={toggleAddAnswerModal}
              />
            </div>
          </QuestionHeader>

          <AnswerWrapper>
            <QAIcon className="a icon">
              <h3>
                A:
              </h3>
            </QAIcon>

            <span className="answer-display">
              { ansDisplayed.map((answer, index) => (
                answer.body
                  ? (
                    <ABody
                      answer={answer}
                      onClickReport={this.report}
                      key={`answer ${index}`}
                      toggleImageCarouselModal={toggleImageCarouselModal}
                    />
                  )
                  : null
              ))}
              { lengthTest.moreToDisplay
                ? <LoadOption type="submit" onClick={this.onClickDisplay}>See More Answers</LoadOption>
                : null}
              { lengthTest.currentlyDisplayingAll
                ? <LoadOption type="submit" onClick={this.onClickCollapse}>No More Answers to Display... Collapse?</LoadOption>
                : null }
            </span>

          </AnswerWrapper>

        </QuestionDiv>
      )
      : null;
  }
}
// }

export default QBody;
