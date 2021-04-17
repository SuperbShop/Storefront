import React from 'react';
import PropTypes from 'prop-types';
import Price from './Price';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { productDetails, selectedStyle } = this.props;
    const { name, category, description } = productDetails;
    return (
      <div className="ProductInfo">
        <h1 className="productTitle">
          Name:
          {name}
        </h1>
        <div className="category">
          Category:
          {category}
        </div>
        <div className="description">
          Description:
          {description}
        </div>
        <div className="price">
          Price:
          <Price selectedStyle={selectedStyle} />
        </div>
      </div>
    );
  }
}

// ProductInfo.propTypes = {
//   productDetails: PropTypes.object.isRequired,
//   name: PropTypes.string.isRequired,
//   category: PropTypes.string.isRequired,
//   description: PropTypes.string,
// };

ProductInfo.defaultProps = {
  description: null,
};

export default ProductInfo;
