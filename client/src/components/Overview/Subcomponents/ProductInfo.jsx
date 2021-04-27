/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import {
  FacebookShareButton, TwitterShareButton, PinterestShareButton,
  FacebookIcon, TwitterIcon, PinterestIcon,
} from 'react-share';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const ProductWrapper = styled.div`
  margin: 0;
  padding: 0;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 2rem;
  margin: 0;
  padding: 0;
`;

const Category = styled.h2`
  font-weight: 200;
  font-size: 1rem;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
`;

const SocialMediaButton = styled.span`
  padding-right: 10px;
`;

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { currentProduct, productRatings } = this.props;
    const { name, category } = currentProduct;
    const url = 'http://127.0.0.1:8080/';

    return (
      <ProductWrapper>
        {productRatings.length > 0
        && <StarRating ratings={productRatings} />}

        <Category>{category}</Category>

        <Title>{name}</Title>

        <SocialMediaButton>
          <FacebookShareButton url={url} quote="cool product!" hashtag="ootd">
            <FacebookIcon round size={30} />
          </FacebookShareButton>
        </SocialMediaButton>
        <SocialMediaButton>
          <TwitterShareButton url={url} title="Check out this product" hashtags={['FEC', 'fashionista', 'ootd', 'fashionstyle']}>
            <TwitterIcon round size={30} />
          </TwitterShareButton>
        </SocialMediaButton>
        <SocialMediaButton>
          <PinterestShareButton url={url} media={url} description="check out this product!">
            <PinterestIcon round size={30} />
          </PinterestShareButton>
        </SocialMediaButton>

      </ProductWrapper>
    );
  }
}

ProductInfo.propTypes = {
  currentProduct: PropTypes.shape({}).isRequired,
  productRatings: PropTypes.arrayOf(PropTypes.shape({})),
  name: PropTypes.string,
  category: PropTypes.string,
};

ProductInfo.defaultProps = {
  productRatings: [],
  name: '',
  category: '',
};

export default ProductInfo;
