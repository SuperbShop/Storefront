import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddToCartWrapper = styled.div`
  padding-top: 10px;
`;

const SelectorsWrapper = styled.div`
  display: flex;
  padding: 1rem 0;
`;

const LeftDiv = styled.div`
  width: 60%;
  float: left;
`;
const RightDiv = styled.div`
  width: 40%;
  float: right;
`;

const AddToBag = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  color: #535353;
  padding: 15px;
  width: 100%;
  border: 1px solid #535353;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
      isInStock: true,
    };
    this.resetThenSet = this.resetThenSet.bind(this);
    this.sizeChangeHandler = this.sizeChangeHandler.bind(this);
  }

  resetThenSet(quantity, size) {
    if (arguments.length === 1) {
      this.setState({
        quantity
      });
    } else {
      this.setState((prevState) => ({
        prevSize: prevState.size,
        size,
        available: quantity,
        isSizeSelected: !prevState.isSizeSelected,
        headerQuantity: 1,
      }), () => this.sizeChangeHandler());
    }
  }

  sizeChangeHandler() {
    if (this.state.prevSize !== this.state.size) {
      this.setState({ isSizeSelected: true });
    } else {
      this.setState((prevState) => ({
        isSizeSelected: true,
        headerQuantity: 1,
        quantity: prevState.quantity,
      }));
    }
  }

  render() {
    return (
      <AddToCartWrapper>
        <SelectorsWrapper>
          <LeftDiv>
            <SizeSelector title={"SELECT SIZE"} skus={this.props.skus} resetThenSet={this.resetThenSet} />
          </LeftDiv>
          <RightDiv>
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
          </RightDiv>
        </SelectorsWrapper>
        <AddToBag>Add To Bag <FontAwesomeIcon icon={faPlus} /></AddToBag>

      </AddToCartWrapper>
    );
  }
}

export default AddToCart;
