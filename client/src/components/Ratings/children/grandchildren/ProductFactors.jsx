import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CharsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 55px;
  margin-top: 10px;
  `;
const CharTitle = styled.p`
  width: 20%;
  margin-left: 5%;
  height: 5px;
  `;

const BackdropDiv = styled.div`
  position: relative;
  background: lightgrey;
  width: 80%;
  height: 0.3em;
  margin-left: 5%;
  `;

const Descriptions = styled.div`
  color: grey;
  font-weight: 0.5;
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
  const { chars, productId } = props;
  const propsArray = Object.keys(chars);

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
          <CharsContainer key={`${prop}${productId}CharContainer`} data-testid="productfactors-1">
            <CharTitle key={`${prop}${productId}CharTitle`}>{prop}</CharTitle>
            <BackdropDiv key={`${prop}${productId}BackdropDiv`}>
              <div
                key={`${prop}Div`}
                style={{
                  position: 'absolute',
                  width: '0',
                  height: '2px',
                  border: '9px solid transparent',
                  borderTopColor: 'black',
                  left: chars[prop].value ? `${chars[prop].value * 17}%` : '0',
                }}
              />
            </BackdropDiv>
            <DescWrapper key={`${prop}${productId}DescWrapper`}>
              <Descriptions key={`${prop}${productId}DescriptionLower`}>{descriptions[0]}</Descriptions>
              <Descriptions key={`${prop}${productId}DescriptionHigher`}>{descriptions[1]}</Descriptions>
            </DescWrapper>
          </CharsContainer>
        );
      })}
    </>
  );
};

ProductFactors.propTypes = {
  productId: PropTypes.number.isRequired,
  chars: PropTypes.shape({
    Fit: PropTypes.shape({}),
    Length: PropTypes.shape({}),
    Comfort: PropTypes.shape({}),
    Quality: PropTypes.shape({}),
    Width: PropTypes.shape({}),
    Size: PropTypes.shape({}),
  }).isRequired,
};

export default ProductFactors;
