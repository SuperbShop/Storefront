import React from 'react';
import axios from 'axios';
// import $ from 'jquery';
import PropTypes from 'prop-types';
import config from '../../../../config';
import ProductInfo from './ProductInfo/ProductInfo';
// import ImageGallery from './ImageGallery';
// import StyleSelector from './StyleSelector';
// import AddToCart from './AddToCart';

axios.defaults.headers.common.Authorization = config.TOKEN; // authorization for all requests

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      productStyles: [],
      selectedStyle: {},
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
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { currentProduct, productStyles, selectedStyle } = this.state;
    return (
      <div className="ProductOverview">
        <div className="ProductInfo">
          <ProductInfo
            currentProduct={currentProduct}
            selectedStyle={selectedStyle}
          />
        </div>
        {/* <div className="AddToCart">
          AddToCart
          <AddToCart />
        </div>
        <div className="ImageGallery">
          ImageGallery
          <ImageGallery />
        </div>
        <div className="StyleSelector">
          StyleSelector
          <StyleSelector />
        </div> */}
      </div>
    );
  }
}

Overview.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Overview;
