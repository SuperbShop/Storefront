import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PriceWrapper = styled.div`
  padding: 15px 0;
  font-size: 13px;
  font-weight: 700;
`;

const RegularPrice = styled.span`
  text-decoration: line-through;
`;

const SalePrice = styled.span`
  color: red;
  padding-left: 5px;
`;

const Price = ({ price, sale }) => (
  <PriceWrapper>
    {sale ? (
      <div>
        <RegularPrice>{`$${Math.round(price)}`}</RegularPrice>
        <SalePrice>{`$${Math.round(sale)}`}</SalePrice>
      </div>
    )
      : (<div>{`$${Math.round(price)}`}</div>)}
  </PriceWrapper>
);

Price.propTypes = {
  price: PropTypes.string,
  sale: PropTypes.string,
};

Price.defaultProps = {
  price: null,
  sale: null,
};

export default Price;
