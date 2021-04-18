import React from 'react';
import styled from 'styled-components';

const DescWrapper = styled.div`
  margin: 3rem;
  padding: 3rem;
  display: flex;
  flex-basis: 60%;
  color: #535353;
  background-color: #cccccc;
`;

const LeftDiv = styled.div`
  width: 70%;
  float: left;
  border-right: 2px solid #000;
`;
const RightDiv = styled.div`
  width: 30%;
  float: right;
`;

const Slogan = styled.h3`
  color: #535353;
`;
const Body = styled.p`
  color: #929292;
`;
const Features = styled.ul`
  list-style-type: none
`;

const Description = ({ currentProduct }) => (
  <DescWrapper>
    <LeftDiv>
      <Slogan>{currentProduct.slogan}</Slogan>
      <Body>{currentProduct.description}</Body>
    </LeftDiv>
    <RightDiv>
      <Features>
        {currentProduct.features
        && currentProduct.features.map((item) => (
          <li key={currentProduct.id += 1}>
            ✓ {item.feature}: {item.value}
          </li>
        ))}
      </Features>
    </RightDiv>

  </DescWrapper>
);
export default Description;
