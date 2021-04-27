import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import Modal from './index';

const PageBlockerModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background-color: rgba(128,128,128,0.5);
  text-align:center;
  box-shadow: 0 5px 10px 2px rgba(195,192,192,.5);
  `;

const ModalWrapper = styled.div`
  position: fixed;
  display: grid;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  width: 900px;
  height: 600px;
  opacity: 100%;
  background: white;
  color: black;
  box-shadow: 0, 5px, 16px, rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const ModalContent = styled.div`
  height: 80%;
  width: 80%;
  border: 2px solid white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  margin: auto;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const FormInput = styled.input`
  width: 100%;
  height: 50px;
  font-size: 1.5 em;
  color: black;
  background-color: white;
  margin: 0 auto;
  // border: 1px solid black;
  width: 100%;
  height: 50px;
  font-size: 1.5 em;
`;

const SubmitButton = styled.button`
  color: black;
  background-color: white;
  border: 2px solid black;
  width: 250px;
  padding: 10px 20px;
  margin: 15px auto;
  display: grid;
`;

const FormHeader = styled.div`
  text-align: center;
`;

const AskQuestion = (props) => {
  const { showAskQuestionModal, toggleAskQuestionModal, productId } = props;
  const toggleModal = toggleAskQuestionModal;
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      toggleModal();
    }
  };
  const keyPress = useCallback((e) => {
    if (e.key === 'Escape' && showAskQuestionModal) {
      toggleModal();
    }
  }, [showAskQuestionModal, toggleModal]);

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      { showAskQuestionModal
        ? (
          <PageBlockerModalDiv ref={modalRef} onClick={closeModal}>
            <Modal>
              <ModalWrapper showAskQuestionModal={showAskQuestionModal} onClick={closeModal}>
                <ModalContent>
                  <CloseModalButton
                    aria-label="Close modal"
                    ref={modalRef}
                    onClick={toggleModal}
                  />
                  <FormHeader>
                    <h1>Ask Your Question</h1>
                    <h3>
                      About the `currentProduct`
                      {/* currentProduct from props goes here */}
                    </h3>
                  </FormHeader>
                  <div>Your Question: </div>
                  <FormInput type="form" />
                  <div>What is Your Nickname: </div>
                  <FormInput type="form" placeholder="Example: jackson11!" />
                  <div>Your Email: </div>
                  <FormInput type="form" placeholder="Why did you like the product or not?" />
                  <p>For authentication reasons, you will not be emailed</p>
                  <SubmitButton type="submit" onClick={toggleModal}>Submit</SubmitButton>
                </ModalContent>
              </ModalWrapper>
            </Modal>
          </PageBlockerModalDiv>
        )
        : null }
    </>
  );
};

export default AskQuestion;
