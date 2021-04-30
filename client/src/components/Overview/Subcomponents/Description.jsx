/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const DescWrapper = styled.div`
  margin: 1rem;
  padding: 1rem;
  display: flex;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  float: left;
  border-right: 2px solid #000;
  padding-right: 15px;
`;
const RightDiv = styled.div`
  width: 30%;
`;

const Slogan = styled.h1`
  font-size: 36px;
  font-weight: 600;
  padding-bottom: 10px;
  &:hover {
    color: green;
    transition: .5s;
  }
`;
const Body = styled.p`
`;
const Features = styled.ul`
  list-style-type: none;
  line-height: 200%;
`;

const Item = styled.li`
  &:hover {
    color: green;
    transition: .5s;
  }
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
                  <Item key={item.value}>
                    <FontAwesomeIcon icon={faCheck} color="green" />
                    {' '}
                    {item.feature}
                    :
                    {' '}
                    {item.value}
                  </Item>
                );
              }
              return (
                <Item key={item.feature}>
                  <FontAwesomeIcon icon={faCheck} />
                  {' '}
                  {item.feature}
                </Item>
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
