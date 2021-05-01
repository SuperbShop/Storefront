/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  ToastContainer, toast, Zoom,
} from 'react-toastify';
import config from '../../../../config';
import ProductInfo from './Subcomponents/ProductInfo';
import Description from './Subcomponents/Description';
import ImageGallery from './Subcomponents/ImageGallery';
import StyleSelector from './Subcomponents/StyleSelector';
import AddToCart from './Subcomponents/AddToCart';

axios.defaults.headers.common.Authorization = config.TOKEN; // authorization for all requests

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopWrapper = styled.div`
  margin: 1rem;
  padding: 1rem;
  display: flex;
`;

const LeftDiv = styled.div`
  width: 65%;
  float: left;
`;

const RightDiv = styled.div`
  width: 35%;
  float: right;
`;

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      productStyles: [],
      selectedStyle: {},
      productRatings: [],
      errorStatusText: null,
      errorStatus: null,

    };
    this.handleStyleChange = this.handleStyleChange.bind(this);
  }

  componentDidMount() {
    this.fetchProduct();
  }

  handleStyleChange(id) {
    const { productStyles } = this.state;
    this.setState({
      selectedStyle: productStyles.find((style) => style.style_id === id),
    });
  }

  fetchProduct() {
    const { productId } = this.props;
    const URL = `api/${productId}`;
    axios.get(URL)
      .then((res) => {
        this.setState({
          currentProduct: res.data,
        });
      })
      .then(() => {
        this.fetchProductStyles();
      })
      .then(() => {
        this.fetchProductRatings();
      })
      .catch((err) => {
        this.setState({
          errorStatusText: `Product ${err.response.statusText}`,
          errorStatus: err.response.status,
        });
      });
  }

  fetchProductStyles() {
    const { productId } = this.props;
    const URL = `api/${productId}/styles`;
    axios.get(URL)
      .then((res) => {
        this.setState({
          productStyles: res.data.results,
          selectedStyle: res.data.results[0],
        });
      })
      .catch((err) => {
        this.setState({
          errorStatusText: `Styles ${err.response.statusText}`,
          errorStatus: err.response.status,
        });
      });
  }

  fetchProductRatings() {
    const { productId } = this.props;
    const URL = `api/${productId}/reviews`;
    axios.get(URL)
      .then((res) => {
        this.setState({
          productRatings: res.data.results,
        });
      })
      .catch((err) => {
        this.setState({
          errorStatusText: `Ratings ${err.response.statusText}`,
          errorStatus: err.response.status,
        });
      });
  }

  render() {
    const {
      currentProduct, productStyles, selectedStyle, productRatings, errorStatus, errorStatusText,
    } = this.state;
    const { photos } = selectedStyle;
    const notify = () => toast.error(
      `${errorStatusText}`,
    );
    if (errorStatus !== null) {
      return (
        <>
          {notify()}
          <ToastContainer
            transition={Zoom}
            position="top-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      );
    }
    if (errorStatus === null) {
      return (
        <Wrapper data-testid="overviewComponent">
          <TopWrapper>
            <LeftDiv>
              <ImageGallery photos={photos} />
            </LeftDiv>
            <RightDiv>
              <ProductInfo
                currentProduct={currentProduct}
                selectedStyle={selectedStyle}
                productRatings={productRatings}
              />
              <StyleSelector
                selectedStyle={selectedStyle}
                styles={productStyles}
                handleStyleChange={this.handleStyleChange}
              />
              <AddToCart
                skus={selectedStyle.skus}
                productName={currentProduct.name}
                styleName={selectedStyle.name}
              />
            </RightDiv>
          </TopWrapper>
          <div className="ProductOverview">
            <div className="Description">
              <Description currentProduct={currentProduct} />
            </div>
          </div>
        </Wrapper>
      );
    }
    return null;
  }
}

Overview.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Overview;
