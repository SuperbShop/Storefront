import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Distribution from './children/Distribution';
import ProductFactors from './children/ProductFactors';
import config from '../../../../config';

class Breakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avgRating: 0,
      percentThatRecommend: 0,
    };
  }

  componentDidMount() {
    const productId = this.props.productNum;
    // send GET to /reviews?product_id=props.product
    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews/meta?product_id=${productId}`,
      headers: {
        Authorization: config.API_KEY,
      },
      success: (data) => {
        let reviewSum = 0;
        let reviewQuantity = 0;
        const ratingsArray = Object.keys(data.ratings);
        for (let i = 0; i < ratingsArray.length; i += 1) {
          reviewSum += ratingsArray[i] * data.ratings[ratingsArray[i]];
          reviewQuantity += Number(data.ratings[ratingsArray[i]]);
        }
        this.setState({
          ratingsDistribution: data.ratings,
          productChararacteristics: data.characteristics,
          avgRating: reviewSum / reviewQuantity,
          percentThatRecommend: 100 * (Number(data.recommended.true) / reviewQuantity),
        });
      },
      error: (err) => console.log(err),
    });
  }

  render() {
    const average = this.state.avgRating || 0;
    // need to incorporate the star graphic
    const percent = this.state.percentThatRecommend || 0;
    const ratingsDist = this.state.ratingsDistribution;
    const productChars = this.state.productChararacteristics;
    return (
      <div id="breakdown">
        <h2>{average}</h2>
        <p>
          {percent}
          % of reviews recommend this product
        </p>
        <section>
          <Distribution dist={ratingsDist} />
          <ProductFactors chars={productChars} />
        </section>
      </div>
    );
  }
}

Breakdown.propTypes = {
  productNum: PropTypes.string.isRequired,
};

export default Breakdown;
