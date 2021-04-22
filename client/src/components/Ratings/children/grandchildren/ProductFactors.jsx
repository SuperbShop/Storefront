import React from 'react';
import styled from 'styled-components';

const CharsContainer = styled.div`
  display: flex;
  flex-direction: column;
  `;
const CharTitle = styled.p`
  width: 20%;
  margin-left: 5%;
  height: 5px;
  `;

const BackdropDiv = styled.div`
  position: relative;
  background-color: lightgrey;
  width: 80%;
  height: 0.5em;
  margin-left: 5%;
  `;

const Descriptions = styled.div`
  font-size: 12px;
  margin-top: 4px;
  `;

const DescWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-left: 5%;
  `;

const ProductFactors = (props) => {
  const propsArray = [];
  if (props.chars) {
    for (const key in props.chars) {
      propsArray.push(key);
    }
  }

  return (
    <>
      {propsArray.map((prop) => {
        let descriptions = [];
        if (prop === 'Size') {
          descriptions = ['A size too small', 'A size too wide'];
        } else if (prop === 'Width') {
          descriptions = ['Too narrow', 'Too wide'];
        } else if (prop === 'Comfort') {
          descriptions = ['Uncomfortable', 'Perfect'];
        } else if (prop === 'Quality') {
          descriptions = ['Poor', 'Perfect'];
        } else if (prop === 'Length') {
          descriptions = ['Runs short', 'Runs long'];
        } else {
          descriptions = ['Runs tight', 'Runs long'];
        }
        return (
          <CharsContainer key={`${prop}${props.productNum}${Math.random()}`}>
            <CharTitle key={`${prop}${props.productNum}${Math.random()}`} >{prop}</CharTitle>
            <BackdropDiv key={`${prop}${props.productNum}${Math.random()}`} >
              <div key={`${prop}${props.productNum}${Math.random()}`} style={{
                position: 'absolute',
                width: '0',
                height: '0',
                border: '8px solid transparent',
                borderTopColor: 'green',
                left: props.chars[prop].value ? `${props.chars[prop].value * 17}%` : '0',
              }}
              />
            </BackdropDiv>
            <DescWrapper key={`${prop}${props.productNum}${Math.random()}`} >
              <Descriptions key={`${prop}${props.productNum}${Math.random()}`} >{descriptions[0]}</Descriptions>
              <Descriptions key={`${prop}${props.productNum}${Math.random()}`} >{descriptions[1]}</Descriptions>
            </DescWrapper>
          </CharsContainer>
        );
      })}
    </>
  );
};

export default ProductFactors;

// charName
// charDiv
//   flex row
// row 1 is grey bars + icon - whos location is dynamic
// row 2 are words - need to be hard coded based on charName
