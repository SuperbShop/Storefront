import React, { useRef, useEffect, useCallback } from 'react';
// import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import Modal from './index';

// const Background = styled.div`
//   width: 100fr;
//   height: 100fr;
//   background: rgba(0, 0, 0, 0.8);
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const PageBlockerModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.8;
  background-color: rgba(128,128,128,0.5);
  `;

const Background = styled.div`
  position: absolute;
  background-color: green;
  left: 0;
  right: 0;
  top: 30%;
  bottom: 0;
  margin: auto;
  width: 90%;
  height: 70%;
  text-align:center;
  box-shadow: 0 5px 10px 2px rgba(195,192,192,.5);
  border: 2px solid green;
  `;

const ModalWrapper = styled.div`
  width: 800px;
  max-height: 30%;
  box-shadow: 0, 5px, 16px, rgba(0, 0, 0, 0.2);
  background: pink;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  flex-direction: column;
  justify-content: center;
  max-height: 30%;
  align-items: center;
  line-height: 1.8;
  color: #141414;
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

const AskQuestion = ({ showModal, openModal }) => {
  const modalRef = useRef();
  console.log(modalRef.current);
  const closeModal = () => {
    openModal();
  };

  return (
    showModal
      ? (
        <PageBlockerModalDiv>
          <Modal>
            <Background ref={modalRef} onClick={closeModal}>
              <ModalWrapper showModal={showModal}>
                <ModalImg src="https://s1.cdn.autoevolution.com/images/news/2021-bmw-m3-set-to-look-like-no-other-bimmer-ever-146407_1.jpg" alt="test" />
                <ModalContent>
                  <h1>This is Chandler</h1>
                </ModalContent>
                <CloseModalButton
                  aria-label="Close modal"
                  onClick={closeModal}
                />
              </ModalWrapper>
            </Background>
          </Modal>
        </PageBlockerModalDiv>

      )
      : null
  );
};

export default AskQuestion;