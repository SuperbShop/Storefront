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
    const { currentProduct, selectedStyle } = this.props;
    const { name, category, description } = currentProduct;
    const { original_price, sale_price } = selectedStyle;
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
          <Price price={original_price} sale={sale_price} />
        </div>
      </div>
    );
  }
}

// ProductInfo.propTypes = {
//   currentProduct: PropTypes.object.isRequired,
//   name: PropTypes.string.isRequired,
//   category: PropTypes.string.isRequired,
//   description: PropTypes.string,
// };

// ProductInfo.defaultProps = {
//   description: null,
// };

export default ProductInfo;
