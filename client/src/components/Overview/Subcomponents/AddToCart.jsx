import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';

const AddToCartWrapper = styled.div`
  padding-top: 10px;
`;

const SelectorsWrapper = styled.div`
  padding-top: 10px;
  display: flex;
`;

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: null,
      prevSize: null,
      available: null,
      quantity: null,
      isSizeSelected: false,
      maxQuantity: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    };
    this.resetThenSet = this.resetThenSet.bind(this);
    this.sizeChangeChecker = this.sizeChangeChecker.bind(this);
  }

  resetThenSet(quantity, size) {
    if (arguments.length === 1) {
      this.setState({
        quantity,
      });
    } else {
      this.setState((prevState) => ({
        prevSize: prevState.size,
        size,
        available: quantity,
        isSizeSelected: !prevState.isSizeSelected,
        headerQuantity: 1,
      }), () => this.sizeChangeChecker());
    }
  }

  sizeChangeChecker() {
    if (this.state.prevSize !== this.state.size) {
      this.setState({ isSizeSelected: true });
    } else {
      this.setState((prevState) => ({ isSizeSelected: true, headerQuantity: prevState.quantity }));
    }
  }

  render() {
    return (
      <AddToCartWrapper>
        <SelectorsWrapper>
          <SizeSelector title="SELECT SIZE" skus={this.props.skus} resetThenSet={this.resetThenSet} />
          {!this.state.isSizeSelected
          && (
          <QuantitySelector
            title="-"
            quantity={this.state.maxQuantity}
            available={this.state.available}
            resetThenSet={this.resetThenSet}
          />
          )}
          {this.state.isSizeSelected
          && (
          <QuantitySelector
            title={this.state.headerQuantity}
            quantity={this.state.maxQuantity}
            available={this.state.available}
            resetThenSet={this.resetThenSet}
          />
          )}
        </SelectorsWrapper>
        <button>Add To Cart</button>
      </AddToCartWrapper>
    );
  }
}

export default AddToCart;
