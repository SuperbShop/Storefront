import React from 'react';
import $ from 'jquery';
import config from '../../../../config';
import ReviewTile from './children/ReviewTile';
import CreateReview from './children/CreateReview';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCreate: false,
    };

    this.openCreateReviewModal = this.openCreateReviewModal.bind(this);
  }

  componentDidMount() {
    // need to rework this request for pagination
    // var url1 = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews?product_id=${this.props.productNum}`;
    const url2 = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews?product_id=23146';
    $.ajax({
      method: 'GET',
      url: url2,
      headers: {
        Authorization: config.API_KEY,
      },
      success: (data) => {
        this.setState({
          list: data.results,
        });
      },
      error: (err) => console.log(err),
    });
  }

  fetchMoreReviews() {
    console.log('fetchMoreReviews');
  }

  openCreateReviewModal() {
    this.setState({
      renderCreate: !this.state.renderCreate,
    });
  }

  render() {
    const reviews = this.state.list || [];
    const createReviewElement = this.state.renderCreate ? <CreateReview productId={this.props.productNum} /> : '';

    // conditionally render more reviews button on if there are more reviews.
    const moreReviewsButton = <button type="button" onClick={this.fetchMoreReviews}>MORE REVIEWS</button>;

    return (
      <div id="tiles">
        <p>
          {reviews.length}
          {' '}
          reviews, sorted by relevance
        </p>
        {reviews.map((item) => <ReviewTile key={item.review_id} review={item} />)}
        {moreReviewsButton}
        <button type="button" onClick={this.openCreateReviewModal}>ADD A REVIEW</button>
        {createReviewElement}
      </div>
    );
  }
}

export default ReviewsList;
