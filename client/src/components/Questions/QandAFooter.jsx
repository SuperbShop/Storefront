import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  width: 100%;
  display: flex-grid;
  justify-content: center;
  `;

const Button = styled.button`
  color: black;
  background-color: white;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  padding: 10px 20px;
  margin: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-size: 15px;
  text-transform: uppercase;
  &:hover {
    border: 1px solid #535353;
    background-color: #000;
    transition: 0.5s;
    color: #fff;
  }
`;

const QandAFooter = (props) => {
  const {
    questions,
    questionsDisplayed,
    displayMore,
    collapse,
    toggleAskQuestionModal,
    refresh,
    bindSubmit,
  } = props;
  const onSubmit = () => {
    toggleAskQuestionModal(true);
    bindSubmit();
  };
  const moreToDisplay = questionsDisplayed < questions.length && questions.length > 2;
  const lessToDisplay = questionsDisplayed > 2 && questions.length <= questionsDisplayed;

  return (
    <FooterWrapper className="QA Footer Question-Buttons">
      { moreToDisplay
        ? <Button type="submit" onClick={displayMore}>More Questions</Button>
        : null
      }
      { lessToDisplay
        ? <Button
            type="submit"
            onClick={collapse}
          >
            No More Questions... Collapse?
          </Button>
        : null
      }
      <Button type="submit" onClick={onSubmit}>
        + Add A Question
      </Button>
    </FooterWrapper>
  );
};

export default QandAFooter;