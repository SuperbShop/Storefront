import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import $ from 'jquery';
import PropTypes from 'prop-types';
import config from '../../../../config';
import ProductInfo from './Subcomponents/ProductInfo';
import Description from './Subcomponents/Description';
import ImageGallery from './Subcomponents/ImageGallery';
// import StyleSelector from './StyleSelector';
// import AddToCart from './AddToCart';

axios.defaults.headers.common.Authorization = config.TOKEN; // authorization for all requests

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopWrapper = styled.div`
  margin: 2rem;
  padding: 2rem;
  display: flex;
  color: #535353;
`;

const LeftDiv = styled.div`
  width: 70%;
  float: left;
`;

const RightDiv = styled.div`
  width: 30%;
  float: right;
`;

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      productStyles: [],
      selectedStyle: {},
      stylePhotos: []
    };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct() {
    const { productId } = this.props;
    const URL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${productId}`;
    axios.get(URL)
      .then((res) => {
        this.setState({
          currentProduct: res.data,
        });
      })
      .then(() => {
        this.fetchProductStyles();
      })
      .catch((err) => console.error(err));
  }

  fetchProductStyles() {
    const { productId } = this.props;
    const URL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${productId}/styles`;
    axios.get(URL)
      .then((res) => {
        this.setState({
          productStyles: res.data.results,
          selectedStyle: res.data.results[0],
          stylePhotos: res.data.results[0].photos
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { currentProduct, productStyles, selectedStyle, stylePhotos } = this.state;
    return (
      <Wrapper>
        <TopWrapper>
          <LeftDiv>
            <ImageGallery photos={this.state.stylePhotos}/>
          </LeftDiv>
          <RightDiv>
            <ProductInfo
              currentProduct={currentProduct}
              selectedStyle={selectedStyle}
            />
          </RightDiv>
        </TopWrapper>
        <div className="ProductOverview">

          <div className="Description">
            <Description currentProduct={currentProduct} />
          </div>
          {/* <div className="AddToCart">
          AddToCart
          <AddToCart />
        </div>

        <div className="StyleSelector">
          StyleSelector
          <StyleSelector />
        </div> */}
        </div>
      </Wrapper>
    );
  }
}

Overview.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Overview;
