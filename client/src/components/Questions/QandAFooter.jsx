import React, { useState } from 'react';
import styled from 'styled-components';

const FooterButton = styled.button`
  color: white;
  background-color: black;
  border: 5px solid white;
  border-radius: 30px;
  display: grid;
  padding: 15px 25px;
  margin: 15px auto 0 auto;
`;

const QandAFooter = (props) => {
  const { questionsDisplayed, questions, displayMore, collapse } = props;
  const moreToDisplay = questionsDisplayed < questions.length && questions.length > 2;
  const lessToDisplay = questionsDisplayed > 2 && questions.length <= questionsDisplayed;

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };
  return (
    <div className="QA Footer Question-Buttons">
      { moreToDisplay
        ? <FooterButton type="submit" onClick={displayMore}>More Answered Questions</FooterButton>
        : null
      }
      { lessToDisplay
        ? <FooterButton type="submit" onClick={collapse}>No More Questions... Collapse?</FooterButton>
        : null
      }
      <FooterButton type="submit" onClick={props.openModal}>Add A Question</FooterButton>
    </div>
  );
}

export default QandAFooter;