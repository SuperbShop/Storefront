import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import config from '../../../../../config';
import ReviewTile from './grandchildren/ReviewTile';
import CreateReview from './grandchildren/CreateReview';
import Modal from './grandchildren/Modal';
// import fetch from '../fetchers.js';

const TilesWrapper = styled.div`
  max-height: 700px;
  overflow-y: auto;
  `;

const PageBlockerModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.8;
  background-color: rgba(128,128,128,0.5);
  `;

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsData: [],
      renderCreate: false,
      filterBy: [],
      sortBy: 'relevance',
      sliceBy: 2,
    };

    this.toggleCreateReviewModal = this.toggleCreateReviewModal.bind(this);
    this.showMoreReviews = this.showMoreReviews.bind(this);
    this.showLessReviews = this.showLessReviews.bind(this);
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

  showLessReviews() {
    this.setState({
      sliceBy: 2,
    });
  }

  toggleCreateReviewModal() {
    this.setState({
      renderCreate: !this.state.renderCreate,
    });
  }

  handleDropdownSelect(e) {
    if (e.target.value === 'helpful') {
      this.setState({
        sortBy: 'helpful',
      });
    } else if (e.target.value === 'newest') {
      this.setState({
        sortBy: 'newest',
      });
    } else {
      this.setState({
        sortBy: 'relevance',
      });
    }
  }

  render() {
    let sortedReviews;
    if (this.state.sortBy === 'newest') {
      sortedReviews = this.state.reviewsData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (this.state.sortBy === 'helpful') {
      sortedReviews = this.state.reviewsData.sort((a, b) => b.helpfulness - a.helpfulness);
    } else {
      sortedReviews = this.state.reviewsData.sort((a, b) => {
        if (a.helpfulness === b.helpfulness) {
          return new Date(b.date) - new Date(a.date);
        }
        return b.helpfulness - a.helpfulness;
      });
    }
    let sortedFilteredReviews = [];
    if (sortedReviews.length > 0) {
      for (let i = 0; i < sortedReviews.length; i++) {
        if (this.props.filterState.includes(sortedReviews[i].rating.toString())) {
          sortedFilteredReviews.push(sortedReviews[i]);
        }
      }
    }
    if (sortedFilteredReviews.length === 0) {
      sortedFilteredReviews = sortedReviews;
    }

    const slicedReviews = sortedFilteredReviews.slice(0, this.state.sliceBy) || [];
    let moreReviewsButton;
    if (this.state.sliceBy < this.state.reviewsData.length) {
      moreReviewsButton = <button type="button" onClick={this.showMoreReviews}>MORE REVIEWS</button>;
    } else {
      moreReviewsButton = <button type="button" onClick={this.showLessReviews}>REVERT TO NORMAL VIEW</button>;
    }

    const sortDropdown = (
      <select onChange={this.handleDropdownSelect.bind(this)} name="Sort" id="SortDropdown">
        <option value="relevance">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    );
    const createReviewElement = this.state.renderCreate ? (
      <PageBlockerModalDiv>
        <Modal>
          <CreateReview metaInfo={this.props.meta} toggleCreateReviewModal={this.toggleCreateReviewModal} productId={this.props.productNum} />
        </Modal>
      </PageBlockerModalDiv>
    )
       : '';

    return (
      <div id="tiles">
        <p>
          {this.state.reviewsData.length}
          {' '}
          reviews, sorted by
          {' '}
          {sortDropdown}
        </p>
        <TilesWrapper>
          {slicedReviews.map((item) => <ReviewTile key={item.review_id} review={item} />)}
        </TilesWrapper>
        {moreReviewsButton}
        <button type="button" onClick={this.toggleCreateReviewModal}>ADD A REVIEW</button>
        {createReviewElement}
      </div>
    );
  }
}

export default ReviewsList;
