import React, {
  useRef, useEffect, useCallback, useState,
} from 'react';
import axios from 'axios';
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

const Featured = styled.h3`
  font-style: italic;
`;

const SubmitButton = styled.button`
  color: black;
  background-color: white;
  border: 1px solid black;
  display: grid;
  justify-content: center;
  align-items: center;
  width: 250px;
  padding: 10px 20px;
  margin: 15px auto;
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

const FormHeader = styled.div`
  text-align: center;
`;

const AddAnswer = (props) => {
  const {
    showAddAnswerModal,
    toggleAddAnswerModal,
    productId,
    productInfo,
    featuredQ,
  } = props;

  console.log('FEATURED: ',featuredQ);

  const toggleModal = toggleAddAnswerModal;
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      toggleModal();
      console.log(modalRef);
    }
  };
  const keyPress = useCallback((e) => {
    if (e.key === 'Escape' && showAddAnswerModal) {
      toggleModal();
    }
  }, [showAddAnswerModal, toggleModal]);
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
    console.log(value);
  };

  const nameChangeHandler = (event) => {
    const { value } = event.target;
    setName(value);
    console.log(value);
  };

  const emailChangeHandler = (event) => {
    const { value } = event.target;
    setEmail(value);
    console.log(value);
  };

  const submitPostReq = (question_id, answer) => {
    console.log('SUBMITTING POST REQ');
    axios.post(`/api/questions/${question_id}/answers`, answer)
      .then((data) => {
        console.log('HELLO', data);
      })
      .catch((err) => console.error(err));
  };

  const submitAnswer = () => {
    const answer = {
      body,
      name,
      email,
    };
    submitPostReq(showAddAnswerModal, answer);
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
      { showAddAnswerModal
        ? (
          <PageBlockerModalDiv ref={modalRef} onClick={closeModal}>
            <Modal>
              <ModalWrapper showAddAnswerModal={showAddAnswerModal} onClick={closeModal}>
                <ModalContent>
                  <CloseModalButton
                    aria-label="Close modal"
                    onClick={toggleModal}
                  />
                  <FormHeader>
                    <h1>Submit Your Answer</h1>
                    <h3>
                      {`${productName}: `}
                    </h3>
                    <Featured>
                      {`"${featuredQ}"`}
                    </Featured>
                  </FormHeader>
                  <div>Your Answer: </div>
                  <FormInput
                    type="form"
                    name="body"
                    onChange={bodyChangeHandler}
                  />
                  <div>What is Your Nickname: </div>
                  <FormInput
                    type="form"
                    name="name"
                    placeholder="Example: jackson11!"
                    onChange={nameChangeHandler}
                  />
                  <div>Your Email: </div>
                  <FormInput
                    type="form"
                    name="email"
                    placeholder="Why did you like the product or not?"
                    onChange={emailChangeHandler}
                  />
                  <p>For authentication reasons, you will not be emailed</p>
                  <div>Add Photos</div>
                  <FormInput
                    type="form"
                    placeholder="Upload Photos"
                  />
                  <SubmitButton
                    type="submit"
                    onClick={submitAnswer}
                  >
                    Submit
                  </SubmitButton>
                </ModalContent>
                <CloseModalButton
                  aria-label="Close modal"
                  ref={modalRef}
                  onClick={toggleModal}
                />
              </ModalWrapper>
            </Modal>
          </PageBlockerModalDiv>
        )
        : null }
    </>
  );
};

export default AddAnswer;
