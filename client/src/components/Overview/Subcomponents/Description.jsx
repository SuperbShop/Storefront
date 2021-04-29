/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

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
  justify-content: left;
  align-items: center;
  display: flex;
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

const Description = ({ currentProduct }) => {
  const { slogan, description, features } = currentProduct;
  return ((slogan || description)
    ? (
      <DescWrapper data-testid="description">
        <LeftDiv>
          <Slogan>{slogan}</Slogan>
          <Body>{description}</Body>
        </LeftDiv>
        <RightDiv>
          <Features>
            {features && features.map((item) => {
              if (item.value) {
                return (
                  <li key={item.value}>
                    <FontAwesomeIcon icon={faCheck} />
                    {' '}
                    {item.feature}
                    :
                    {' '}
                    {item.value}
                  </li>
                );
              }
              return (
                <li key={item.feature}>
                  <FontAwesomeIcon icon={faCheck} />
                  {' '}
                  {item.feature}
                </li>
              );
            })}
          </Features>
        </RightDiv>

      </DescWrapper>
    ) : null);
};

Description.propTypes = {
  currentProduct: PropTypes.shape({}).isRequired,
  slogan: PropTypes.string,
  description: PropTypes.string,
};

Description.defaultProps = {
  slogan: '',
  description: '',
};

export default Description;
