import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import config from '../../../../config';
import ReviewTile from './children/ReviewTile';
import CreateReview from './children/CreateReview';
import fetch from './fetchers.js';

const TilesWrapper = styled.div`
  background-color: lightblue;
  max-height: 700px;
  overflow-y: auto;
  `;

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsData: [],
      renderCreate: false,
      filterBy: 'none',
      sliceBy: 2,
    };

    this.openCreateReviewModal = this.openCreateReviewModal.bind(this);
    this.showMoreReviews = this.showMoreReviews.bind(this);
  }

  componentDidMount() {
    // console.log('props from RList', this.props);
    // const product = this.props.productNum;
    // console.log(product);

    // fetch.listGetter(product)
    //   .then((res) => {
    //     this.setState({
    //       reviewsData: res.results,
    //     });
    //   })
    //   .catch((err) => console.error(err));

    const url2 = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews?product_id=23146';
    $.ajax({
      method: 'GET',
      url: url2,
      headers: {
        Authorization: config.API_KEY,
      },
      success: (data) => {
        this.setState({
          reviewsData: data.results,
        });
      },
      error: (err) => console.log(err),
    });
  }

  showMoreReviews() {
    this.setState({
      sliceBy: this.state.sliceBy += 2,
    });
  }

  openCreateReviewModal() {
    this.setState({
      renderCreate: !this.state.renderCreate,
    });
  }

  render() {
    let slicedReviews = this.state.reviewsData.slice(0, this.state.sliceBy) || [];
    let moreReviewsButton;
    if (this.state.sliceBy < this.state.reviewsData.length) {
      moreReviewsButton = <button type="button" onClick={this.showMoreReviews}>MORE REVIEWS</button>;
    } else {
      moreReviewsButton = '';
    }
    const createReviewElement = this.state.renderCreate ? <CreateReview productId={this.props.productNum} /> : '';

    return (
      <div id="tiles">
        <p>
          {this.state.reviewsData.length}
          {' '}
          reviews, sorted by relevance
        </p>
        <TilesWrapper>
          {slicedReviews.map((item) => <ReviewTile key={item.review_id} review={item} />)}
        </TilesWrapper>
        {moreReviewsButton}
        <button type="button" onClick={this.openCreateReviewModal}>ADD A REVIEW</button>
        {createReviewElement}
      </div>
    );
  }
}

export default ReviewsList;
