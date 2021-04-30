import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  &:disabled {
    opacity: 0.5;
    color: #666666;
    cursor:not-allowed;
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
      isQuantitySelected: false,
      maxQuantity: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      liked: false,
    };
    this.resetThenSet = this.resetThenSet.bind(this);
    this.sizeChangeHandler = this.sizeChangeHandler.bind(this);
    this.handleLikeClicked = this.handleLikeClicked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLikeClicked() {
    const { liked } = this.state;
    this.setState({ liked: !liked });
  }

  handleSubmit() {
    const { productName, styleName } = this.props;
    const { size, quantity } = this.state;
    alert(`${productName} (${styleName})\nSize: ${size} - qty: ${quantity}`);
  }

  sizeChangeHandler() {
    const { prevSize, size } = this.state;
    if (prevSize !== size) {
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
    const {
      liked, isSizeSelected, available, maxQuantity, headerQuantity, quantity,
    } = this.state;
    const { skus } = this.props;
    const skusObj = Object.keys(skus).map((key) => skus[key]);

    return (skusObj.length > 0 ? (
      <AddToCartWrapper data-testid="addToCart">
        <SelectorsWrapper>
          <LeftDiv>
            <SizeSelector title={skusObj.includes('null') ? 'OUT OF STOCK' : 'SELECT SIZE'} skus={skus} resetThenSet={this.resetThenSet} />
          </LeftDiv>
          <RightDiv>
            {isSizeSelected ? (
              <QuantitySelector
                title={headerQuantity}
                quantity={maxQuantity}
                available={available}
                resetThenSet={this.resetThenSet}
              />
            ) : (
              <QuantitySelector
                title="-"
                quantity={maxQuantity}
                available={available}
                resetThenSet={this.resetThenSet}
              />
            )}
          </RightDiv>
        </SelectorsWrapper>
        <AddWrapper>
          {(isSizeSelected && quantity !== null) ? (
            <AddBtn onClick={this.handleSubmit}>
              Add To Bag
              <FontAwesomeIcon icon={faPlus} />
            </AddBtn>
          ) : (
            <AddBtn disabled>
              Add To Bag
              <FontAwesomeIcon icon={faPlus} />
            </AddBtn>
          )}

          {liked
            ? <LikeBtn aria-label="Like Button" onClick={this.handleLikeClicked}><FontAwesomeIcon color="red" icon={faHeart} /></LikeBtn>
            : (
              <LikeBtn aria-label="Like Button" onClick={this.handleLikeClicked}>
                <FontAwesomeIcon icon={farHeart} />
              </LikeBtn>
            )}
        </AddWrapper>

      </AddToCartWrapper>
    ) : null

    );
  }
}

AddToCart.propTypes = {
  skus: PropTypes.shape({}),
  productName: PropTypes.string,
  styleName: PropTypes.string,
};

AddToCart.defaultProps = {
  skus: {},
  productName: '',
  styleName: '',
};

export default AddToCart;
