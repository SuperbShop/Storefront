import React from 'react';
import PropTypes from 'prop-types';
import Breakdown from './Breakdown';
import ReviewsList from './ReviewsList';

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // property: true,
      // make state equal to props.product
    };
  }
  // pass props from above into Breakdown & ReviewsList

  render() {
    const productNum = this.props.product;
    return (
      <div id="ratings-reviews">
        <h2>Ratings & Reviews</h2>
        <div id="breakdown">
          <Breakdown productNum={productNum} />
        </div>
        <div id="reviews-list">
          ReviewsList
          <ReviewsList productNum={productNum} />
        </div>
      </div>
    );
  }
}

Ratings.propTypes = {
  product: PropTypes.string.isRequired,
};

export default Ratings;
