import React from 'react';
import PropTypes from 'prop-types';
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

const CharsRadioButtons = (props) => {
  const { name, charsObject, handleCharRadioClick } = props;
  return (
    <>
      <CharWrapper>
        <TitleWrapper id={`${name}`}>
          {name}
          : None selected
        </TitleWrapper>
        <RadioButtonsWrapper>
          <input type="radio" key={`${name}1`} onClick={handleCharRadioClick} required="required" name={`${name}`} value="1" />
          <input type="radio" key={`${name}2`} onClick={handleCharRadioClick} required="required" name={`${name}`} value="2" />
          <input type="radio" key={`${name}3`} onClick={handleCharRadioClick} required="required" name={`${name}`} value="3" />
          <input type="radio" key={`${name}4`} onClick={handleCharRadioClick} required="required" name={`${name}`} value="4" />
          <input type="radio" key={`${name}5`} onClick={handleCharRadioClick} required="required" name={`${name}`} value="5" />
        </RadioButtonsWrapper>
        <DescriptionsWrapper>
          <div>
            {charsObject[name][0]}
          </div>
          <div>
            {charsObject[name][4]}
          </div>
        </DescriptionsWrapper>
      </CharWrapper>
    </>
  );
};

CharsRadioButtons.propTypes = {
  name: PropTypes.string.isRequired,
  handleCharRadioClick: PropTypes.func.isRequired,
  charsObject: PropTypes.shape({
    Size: PropTypes.arrayOf(PropTypes.string),
    Width: PropTypes.arrayOf(PropTypes.string),
    Comfort: PropTypes.arrayOf(PropTypes.string),
    Quality: PropTypes.arrayOf(PropTypes.string),
    Length: PropTypes.arrayOf(PropTypes.string),
    Fit: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CharsRadioButtons;
