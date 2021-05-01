import React, {
  useRef, useEffect, useCallback, useState,
} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
  height: 650px;
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
  const {
    showAskQuestionModal,
    toggleAskQuestionModal,
    productId,
    productInfo,
    submitFunc,
  } = props;

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

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const bodyChangeHandler = (event) => {
    const { value } = event.target;
    setBody(value);
  };
  const nameChangeHandler = (event) => {
    const { value } = event.target;
    setName(value);
  };
  const emailChangeHandler = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const submitPostReq = (question, productId) => {
    axios.post('/api/qa/questions', question)
      .then(() => {
        submitFunc(productId.toString());
      })
      .catch((err) => console.error(err));
  };
  const submitQuestion = () => {
    const question = {
      product_id: productId,
      body,
      name,
      email,
    };
    submitPostReq(question, productId);
    setBody('');
    setName('');
    setEmail('');
    toggleModal();
  };

  let productName;
  if (productInfo.data) {
    productName = productInfo.data.name;
  } else {
    productName = 'product';
  }

  return (
    <>
      { showAskQuestionModal
        ? (
          <PageBlockerModalDiv ref={modalRef} onClick={closeModal}>
            <Modal>
              <ModalWrapper
                showAskQuestionModal={showAskQuestionModal}
              >
                <ModalContent>
                  <CloseModalButton
                    aria-label="Close modal"
                    onClick={toggleModal}
                  />
                  <FormHeader>
                    <h1>Ask Your Question</h1>
                    <h3>About the {productName}</h3>
                  </FormHeader>
                  <div>Your Question: </div>
                  <FormInput
                    type="form"
                    name="body"
                    value={body}
                    onChange={bodyChangeHandler}
                  />
                  <div>What is Your Nickname: </div>
                  <FormInput
                    type="form"
                    name="name"
                    placeholder="Example: jackson11!"
                    value={name}
                    onChange={nameChangeHandler}
                  />
                  <div>Your Email: </div>
                  <FormInput
                    type="form"
                    name="email"
                    placeholder="Why did you like the product or not?"
                    value={email}
                    onChange={emailChangeHandler}
                  />
                  <p>For authentication reasons, you will not be emailed</p>
                  <SubmitButton
                    type="submit"
                    name="email"
                    onClick={submitQuestion}
                  >
                    Submit
                  </SubmitButton>
                </ModalContent>
              </ModalWrapper>
            </Modal>
          </PageBlockerModalDiv>
        )
        : null }
    </>
  );
};

AskQuestion.propTypes = {
  // toggleAskQuestionModal: PropTypes.function.isRequired,
  showAskQuestionModal: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  productId: PropTypes.number.isRequired,
  // productInfo: PropTypes.shape({
  //   congfig: PropTypes.shape({

  //   })
  // }).isRequired,
};

export default AskQuestion;
