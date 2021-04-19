import React from 'react';
import $ from 'jquery';
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
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews?product_id=${productId}`,
      headers: {
        Authorization: config.API_KEY,
      },
      success: (data) => {
        let sum = 0;
        let recommendations = 0;
        console.log(data);
        for (let i = 0; i < data.results.length; i++) {
          sum += data.results[i].rating;
          if (data.results[i].recommend) {
            recommendations++;
          }
        }
        console.log(sum);
        this.setState({
          productData: data,
          avgRating: sum / data.results.length,
          percentThatRecommend: (recommendations / data.results.length) * 100,
        });
      },
      error: (err) => console.log(err),
    });
  }

  render() {
    const average = this.state.avgRating || 0;
    // need to incorporate the star graphic
    const percent = this.state.percentThatRecommend || 0;
    return (
      <div id="breakdown">
        <strong>{average}</strong>
        <p>
          {percent}
          % of reviews recommend this product
        </p>
        <section>
          <Distribution />
          <ProductFactors />
        </section>
      </div>
    );
  }
}

export default Breakdown;
