import React from 'react';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // state idk
    };
  }

  render() {
    console.log('from tile', this.props.review);
    var recommendation = this.props.review.recommend ? 'I recommend this product' : '';
    return (
      <div id="review-tile">
        <p>{this.props.review.rating} Stars</p>
        <strong>{this.props.review.summary}</strong>
        <p>{recommendation}</p>
        <p>{this.props.review.body}</p>
        <p>Sales team response</p>
        <button type="button">Helpful?</button>
      </div>
    );
  }
}

export default ReviewTile;
