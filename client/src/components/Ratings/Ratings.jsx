import React from 'react';
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
    return (
      <div id="ratings-reviews">
        <h2>Ratings</h2>
        <div id="breakdown">
          <Breakdown productNum={this.props.product} />
        </div>
        <div id="reviews-list">
          ReviewsList
          <ReviewsList productNum={this.props.product} />
        </div>
      </div>
    );
  }
}

export default Ratings;
