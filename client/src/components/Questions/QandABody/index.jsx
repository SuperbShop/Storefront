import React from 'react';
import styled from 'styled-components';
import QBody from './QBody';
import QandAFooter from '../QandAFooter';

const QuestionComponent = styled.div`
  background-color: #fff;
  max-height: 10%;
  overflow: scroll;
`;
const QuestionBodyComp = styled.div`
  width: 100%;
`;
const sortByQHelpful = (arr) => {
  const copy = arr.slice();
  copy.sort((question, nextQ) => ((question.question_helpfulness > nextQ.question_helpfulness)
    ? -1 : 1));
  return copy;
};

const QandABody = (props) => {
  const {
    report,
    questionsDisplayed,
    toggleAddAnswerModal,
    toggleImageCarouselModal,
    toggleAskQuestionModal,
    collapse,
    displayMore,
  } = props;
  const results = props.QandA.results;

  const questionArr = sortByQHelpful(results);
  const displayArr = questionArr.slice(0, questionsDisplayed);
  const lengthTest = (results.length > 2
  && results.length > displayArr.length
  && displayArr.length > 0);
  return (
    <QuestionComponent>
      <QuestionBodyComp className="QA-Body">
        { displayArr.map((result, index) => (
          <QBody
            question={result}
            key={`${index}`}
            report={report}
            toggleAddAnswerModal={toggleAddAnswerModal}
            toggleImageCarouselModal={toggleImageCarouselModal}
          />
        ))}
      </QuestionBodyComp>
      <QandAFooter
        displayMore={displayMore}
        collapse={collapse}
        lengthTest={lengthTest}
        questionsDisplayed={questionsDisplayed}
        questions={questionArr}
        toggleAskQuestionModal={toggleAskQuestionModal}
      />
    </QuestionComponent>
  );
};

export default QandABody;
