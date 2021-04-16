import React from 'react';
import Distribution from './children/Distribution';
import ProductFactors from './children/ProductFactors';

class Breakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // idk yet
    };
  }

  componentDidMount() {
    // send GET to /reviews?product_id=props.product
  }

  render() {
    return (
      <div id="breakdown">
        This is the ratings breakdown Component
        <section>
          <Distribution />
          <ProductFactors />
        </section>
      </div>
    );
  }
}

export default Breakdown;
