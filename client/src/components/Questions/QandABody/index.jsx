import React from 'react';
import styled from 'styled-components';
import QBody from './QBody';
import QandAFooter from '../QandAFooter';

const QuestionComponent = styled.div`
  background-color: rgb(190, 190, 190);
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
  const results = props.QandA.results;
  const report = props.report;
  const questionsDisplayed = props.questionsDisplayed;
  const QuestionArr = sortByQHelpful(results);
  const displayArr = QuestionArr.slice(0, questionsDisplayed);
  const lengthTest = (results.length > 2
  && results.length > displayArr.length
  && displayArr.length > 0);

  const { showAskQuestion, setShowAskQuestion } = props;

  const openModal = () => {
    setShowModal(prev => !prev);
  };
  console.log('results: ',results);
  return (
    <QuestionComponent>
      {/* <AskQuestion showModal={showAskQuestion} setShowModal={setShowAskQuestion} /> */}
      <QuestionBodyComp className="QA-Body">
        { displayArr.map((result, index) => (
          <QBody question={result} key={`${index}`} report={report} />
        ))}
      </QuestionBodyComp>
      <QandAFooter
        displayMore={props.displayMore}
        collapse={props.collapse}
        lengthTest={lengthTest}
        questionsDisplayed={questionsDisplayed}
        questions={QuestionArr}
        openModal={props.openModal}
      />
    </QuestionComponent>
  );
};

export default QandABody;
