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
  console.log('PFProps', props);
  const { chars, productNum } = props;
  const propsArray = [];
  if (chars) {
    for (const key in chars) {
      if (Object.prototype.hasOwnProperty.call(chars, key)) {
        propsArray.push(key);
      }
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
          <CharsContainer key={`${prop}${productNum}${Math.random()}`}>
            <CharTitle key={`${prop}${productNum}${Math.random()}`}>{prop}</CharTitle>
            <BackdropDiv key={`${prop}${productNum}${Math.random()}`}>
              <div
                key={`${prop}${productNum}${Math.random()}`}
                style={{
                  position: 'absolute',
                  width: '0',
                  height: '0',
                  border: '8px solid transparent',
                  borderTopColor: 'green',
                  left: chars[prop].value ? `${chars[prop].value * 17}%` : '0',
                }}
              />
            </BackdropDiv>
            <DescWrapper key={`${prop}${productNum}${Math.random()}`}>
              <Descriptions key={`${prop}${productNum}${Math.random()}`}>{descriptions[0]}</Descriptions>
              <Descriptions key={`${prop}${productNum}${Math.random()}`}>{descriptions[1]}</Descriptions>
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
