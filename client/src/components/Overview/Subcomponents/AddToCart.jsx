import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';

const AddToCartWrapper = styled.div`
  padding-top: 10px;
`;

const SelectorsWrapper = styled.div`
  display: flex;
  padding: 1rem 0;
`;

const LeftDiv = styled.div`
  width: 70%;
  float: left;
`;
const RightDiv = styled.div`
  width: 30%;
  float: right;
`;

const AddBtn = styled.button`
display: flex;
justify-content: space-between;
align-items: center;
background-color: #fff;
color: #535353;
padding: 15px;
width: 75%;
border: 1px solid #535353;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
font-weight: 500;
font-size: 15px;
text-transform: uppercase;
&:hover {
  border: 1px solid #535353;
  background-color: #000;
  transition: 0.5s;
  color: #fff;
}
`;

const LikeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #535353;
  padding: 15px;
  width: 20%;
  border: 1px solid #535353;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &:hover {
    border: 1px solid #535353;
    background-color: #000;
    transition: 0.5s;
    color: #fff;
  }
`;

const AddWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
      liked: false,
      selectedSKU: null,
    };
    this.resetThenSet = this.resetThenSet.bind(this);
    this.sizeChangeHandler = this.sizeChangeHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ liked: !this.state.liked });
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
      }), () => this.sizeChangeHandler());
    }
  }

  render() {
    return (
      <AddToCartWrapper>
        <SelectorsWrapper>
          <LeftDiv>
            <SizeSelector title="SELECT SIZE" skus={this.props.skus} resetThenSet={this.resetThenSet} />
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
        <AddWrapper>
          <AddBtn>
            Add To Bag
            <FontAwesomeIcon icon={faPlus} />
          </AddBtn>

          {this.state.liked
            ? <LikeBtn onClick={this.handleClick}><FontAwesomeIcon color="red" icon={faHeart} /></LikeBtn>
            : <LikeBtn onClick={this.handleClick}><FontAwesomeIcon icon={farHeart} /></LikeBtn>}
        </AddWrapper>

      </AddToCartWrapper>
    );
  }
}

export default AddToCart;
