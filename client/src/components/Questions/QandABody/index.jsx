import React from 'react';
import styled from 'styled-components';
import QBody from './QBody';
import QandAFooter from '../QandAFooter';

const QuestionComponent = styled.div`
  overflow-y: auto;
`;
const QuestionBodyComp = styled.div`
  width: 100%;
`;
const sortByQHelpful = (arr) => {
  let result = [];
  const copy = arr.slice();
  copy.sort((question, nextQ) => ((question.question_helpfulness > nextQ.question_helpfulness)
    ? -1 : 1));
  copy.forEach((question) => {
    if (!question.reported) {
      result.push(question);
    }
  });
  return result;
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
    refresh,
    bindSubmit,
    setFeaturedImages,
  } = props;
  const results = props.QandA.results;
  const { product_id } = props.QandA;

  const questionArr = sortByQHelpful(results);
  const displayArr = questionArr.slice(0, questionsDisplayed);
  const lengthTest1 = (results.length > 2
  && results.length > displayArr.length
  && displayArr.length > 0);
  const lengthTest2 = props.QandA.results.length > 0;
  // console.log('DISPLAYED: ',displayArr);
  return (
    <>
      <QuestionComponent>
        <QuestionBodyComp className="QA-Body">
          { displayArr.map((result) => {
            // if (!result.reported) {
              return (
                <div key={'question ' + result.question_id}>
                  <QBody
                    product_id={product_id}
                    question={result}
                    report={report}
                    refresh={refresh}
                    toggleAddAnswerModal={toggleAddAnswerModal}
                    toggleImageCarouselModal={toggleImageCarouselModal}
                    bindSubmit={bindSubmit}
                    setFeaturedImages={setFeaturedImages}
                  />
                </div>
              );
            }
          // }
          )}
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
            refresh={refresh}
            bindSubmit={bindSubmit}
          />
        )
        : null }
    </>
  );
};

export default QandABody;
