import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const DescWrapper = styled.div`
  margin: 3rem;
  padding: 3rem;
  display: flex;
  color: #535353;
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
  list-style-type: none;
  line-height: 200%;
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
        && currentProduct.features.map((item, index) => {
          if (item.value) {
            return (
              <li key={index += 1}>
                <FontAwesomeIcon icon={faCheck} /> {item.feature}: {item.value}
              </li>
            )
          }
          return (
            <li key={index += 1}>
              <FontAwesomeIcon icon={faCheck} /> {item.feature}
            </li>
          )
          })}
      </Features>
    </RightDiv>

  </DescWrapper>
);
export default Description;
