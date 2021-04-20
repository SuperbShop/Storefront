import React from 'react';
import styled from 'styled-components';

const CharsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: yellow;
  `;

const ProductFactors = (props) => {
  let fitVal;
  let comfortVal;
  let lengthVal;
  let qualityVal;

  if (props.chars) {
    var relevantChars = Object.keys(props.chars);
    // maybe map through relevantChars and invoke a Slider component
    // slider needs to reflect value and name of characteristic
    // business reqs details the labels to these sliders

    fitVal = 'Fit: ' + props.chars.Fit.value;
    comfortVal = 'Comfort: ' + props.chars.Comfort.value;
    lengthVal = 'Length: ' + props.chars.Length.value;
    qualityVal = 'Quality: ' + props.chars.Quality.value;
  }
  return (
    <CharsContainer>
      <p>{fitVal}</p>
      <p>{comfortVal}</p>
      <p>{lengthVal}</p>
      <p>{qualityVal}</p>
    </CharsContainer>
  );
};

export default ProductFactors;
