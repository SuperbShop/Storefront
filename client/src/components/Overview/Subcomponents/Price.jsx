import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PriceWrapper = styled.div`
  padding: 15px 0;
  font-size: 13px;
  font-weight: 300;
`;

const RegularPrice = styled.span`
  text-decoration: line-through;

`;

const SalePrice = styled.span`
  color: red;
  padding-left: 5px;
  font-weight: 700;
`;

const Price = ({ price, sale }) => (
  <PriceWrapper>
    {sale ? (
      <div>
        <RegularPrice>{`$${price}`}</RegularPrice>
        <SalePrice>{`$${sale}`}</SalePrice>
      </div>
    )
      : (<div>{`$${price}`}</div>)}
  </PriceWrapper>
);

export default Price;
