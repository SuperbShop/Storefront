import React from 'react';
import styled from 'styled-components';
import QBody from './QBody';
import QandAFooter from '../QandAFooter';

const QuestionComponent = styled.div`
  background-color: #fff;
  overflow-y: auto;
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
  const lengthTest1 = (results.length > 2
  && results.length > displayArr.length
  && displayArr.length > 0);
  const lengthTest2 = props.QandA.results.length > 0;
  return (
    <>
      <QuestionComponent>
        <QuestionBodyComp className="QA-Body">
          { displayArr.map((result) => (
            <div key={'question'+result.id}>
              <QBody
                question={result}
                report={report}
                toggleAddAnswerModal={toggleAddAnswerModal}
                toggleImageCarouselModal={toggleImageCarouselModal}
              />
            </div>
          ))}
        </QuestionBodyComp>
      </QuestionComponent>
      { lengthTest2
        ? (
          <QandAFooter
            displayMore={displayMore}
            collapse={collapse}
            lengthTest1={lengthTest1}
            questionsDisplayed={questionsDisplayed}
            questions={questionArr}
            toggleAskQuestionModal={toggleAskQuestionModal}
          />
        )
        : null }
    </>
  );
};

export default QandABody;
