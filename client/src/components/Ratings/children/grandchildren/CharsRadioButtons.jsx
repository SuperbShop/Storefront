import React from 'react';
import styled from 'styled-components';

const CharWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  `;

const TitleWrapper = styled.div`
  display: flex;
  margin-left: 5%;
  height: 20%;
`;

const RadioButtonsWrapper = styled.div`
  width: 50%;
  margin-left: 30%;
  display: flex;
  justify-content: space-between;
  align-items:center;
  height: 50%;
  `;

const DescriptionsWrapper = styled.div`
  width: 54%;
  height: 20%;
  margin-left: 28%;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
`;

const CharsRadioButtons = (props) => (
  <>
  <CharWrapper>
    <TitleWrapper id={`${props.name}`}>
      {props.name}
      : None selected
    </TitleWrapper>
    <RadioButtonsWrapper>
    <input type="radio" key={`${props.name}${Math.random()}`} onClick={props.handleCharRadioClick} required="required" name={`${props.name}`} value="1" />
    <input type="radio" key={`${props.name}${Math.random()}`} onClick={props.handleCharRadioClick} required="required" name={`${props.name}`} value="2" />
    <input type="radio" key={`${props.name}${Math.random()}`} onClick={props.handleCharRadioClick} required="required" name={`${props.name}`} value="3" />
    <input type="radio" key={`${props.name}${Math.random()}`} onClick={props.handleCharRadioClick} required="required" name={`${props.name}`} value="4" />
    <input type="radio" key={`${props.name}${Math.random()}`} onClick={props.handleCharRadioClick} required="required" name={`${props.name}`} value="5" />
    </RadioButtonsWrapper>

    <DescriptionsWrapper>

    <div>
      {props.charsObject[props.name][0]}
    </div>
    <div>
      {props.charsObject[props.name][4]}
    </div>
    </DescriptionsWrapper>

    </CharWrapper>
  </>
);

export default CharsRadioButtons;
