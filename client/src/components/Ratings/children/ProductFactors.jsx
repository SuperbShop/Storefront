import React from 'react';

class ProductFactors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // factors: [length, fit]
    };
  }

  render() {
    return (
      <div id="product-factors">
        <p>These are the product factors</p>
        <p>This product has fit, comfort factors</p>
      </div>
    );
  }
}

export default ProductFactors;
