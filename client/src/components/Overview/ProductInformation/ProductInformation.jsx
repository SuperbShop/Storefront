import React from 'react';
import PropTypes from 'prop-types';
// import ImageGallery from './ImageGallery';
// import StyleSelector from './StyleSelector';
// import AddToCart from './AddToCart';

// const ProductInformation = ({productDetails}) => (

//   <div>
//       const {name, category, description} = productDetails;
//     <div className="productName">{productDetails.name}</div>
//     <div className="category">{productDetails.category}</div>
//   </div>

// );
class ProductInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { productDetails } = this.props;
    const { name, category, description } = productDetails;
    return (
      <div className="ProductInfo">
        <h1 className="productTitle">Name: {name}</h1>
        <div className="category">Category: {category}</div>
        <div className="description">Description: {description}</div>
      </div>
    );
  }
}

// ProductInformation.propTypes = {
//   productDetails: PropTypes.object.isRequired,
//   name: PropTypes.string.isRequired,
//   category: PropTypes.string.isRequired,
//   description: PropTypes.string,
// };

ProductInformation.defaultProps = {
  description: null,
};

export default ProductInformation;
