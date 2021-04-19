import React from 'react';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // state idk
    };
  }

  render() {
    const recommendation = this.props.review.recommend ? 'I recommend this product' : '';
    const response = this.props.review.response ? this.props.review.response : '';
    return (
      <div id="review-tile">
        <p>{this.props.review.rating} Stars</p>
        <strong>{this.props.review.summary}</strong>
        <p>{recommendation}</p>
        <p>{this.props.review.body}</p>
        <p>{response}</p>
        <p>
          Helpful?
          <button type="button">Yes</button>
          ({this.props.review.helpfulness})
          <button type="button">No</button>
        </p>
      </div>
    );
  }
}

export default ReviewTile;
