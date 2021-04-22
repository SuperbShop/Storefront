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

const Descriptions = styled.p`
  font-size: 12px;
  `;

const DescWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-left: 5%;
  `;

const ProductFactors = (props) => {
  console.log('PF props', props);
  let propsArray = [];
  if (props.chars) {
    for (let key in props.chars) {
      propsArray.push(key);
      console.log(`${key}`, props.chars[key].value);

    }
  }

  // const Icon = styled.div`
  // position: absolute;
  // width: 0;
  // height: 0;
  // border: 8px solid transparent;
  // border-top-color: green;
  // `;

    // maybe map through relevantChars and invoke a Slider component
    // slider needs to reflect value and name of characteristic
    // business reqs details the labels to these sliders

  return (
    <React.Fragment>
      {propsArray.map(prop => {
        let descriptions = [];
        if (prop === "Size") {
          descriptions = ["A size too small", "A size too wide"];
        } else if (prop === "Width") {
          descriptions = ["Too narrow", "Too wide"];
        } else if (prop === "Comfort") {
          descriptions = ["Uncomfortable", "Perfect"];
        } else if (prop === "Quality") {
          descriptions = ["Poor", "Perfect"];
        } else if (prop === "Length") {
          descriptions = ["Runs short", "Runs long"];
        } else {
          descriptions = ["Runs tight", "Runs long"];
        }
        console.log('props.chars inside map', props.chars);
        console.log('prop right next to it', prop);
        console.log('put them together', props.chars[prop]);
        return <CharsContainer>
        <CharTitle>{prop}</CharTitle>
        <BackdropDiv>
          <div style={{position: "absolute", width: "0",
  height: "0",
  border: "8px solid transparent",
  borderTopColor: "green",
  left: props.chars[prop].value ? (props.chars[prop].value * 19) + "%" : "0",}}>
    </div>
    </BackdropDiv>
        <DescWrapper>
        <Descriptions>{descriptions[0]}</Descriptions>
        <Descriptions>{descriptions[1]}</Descriptions>
        </DescWrapper>
      </CharsContainer>
      })}
    </React.Fragment>
  );
};

export default ProductFactors;

// charName
// charDiv
//   flex row
// row 1 is grey bars + icon - whos location is dynamic
// row 2 are words - need to be hard coded based on charName
