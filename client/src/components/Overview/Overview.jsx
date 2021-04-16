import React from 'react';
import axios from 'axios';
// import $ from 'jquery';
import PropTypes from 'prop-types';
import config from '../../../../config';
import ProductInformation from './ProductInformation/ProductInformation';
// import ImageGallery from './ImageGallery';
// import StyleSelector from './StyleSelector';
// import AddToCart from './AddToCart';

axios.defaults.headers.common.Authorization = config.TOKEN; // authorization for all requests

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: {},
      productStyles: [],
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
          productDetails: res.data,
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
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { productDetails, productStyles } = this.state;
    return (

      <div className="ProductOverview">
        <div className="ProductInformation">
          ProductInformation
          <ProductInformation productDetails={productDetails} />
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
