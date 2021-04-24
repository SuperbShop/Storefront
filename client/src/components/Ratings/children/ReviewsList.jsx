import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReviewTile from './grandchildren/ReviewTile';
import CreateReview from './grandchildren/CreateReview';
import Modal from './grandchildren/Modal';

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
      sortBy: 'relevance',
      sliceBy: 2,
    };

    this.toggleCreateReviewModal = this.toggleCreateReviewModal.bind(this);
    this.showMoreReviews = this.showMoreReviews.bind(this);
    this.showLessReviews = this.showLessReviews.bind(this);
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

  toggleCreateReviewModal() {
    this.setState({
      renderCreate: !this.state.renderCreate,
    });
  }

  showLessReviews() {
    this.setState({
      sliceBy: 2,
    });
  }

  showMoreReviews() {
    this.setState({
      sliceBy: this.state.sliceBy += 2,
    });
  }

  render() {
    const {
      sortBy,
      sliceBy,
      renderCreate,
    } = this.state;
    const {
      reviewsList,
      reviewsMeta,
      filterState,
      productName,
    } = this.props;

    let sortedReviews;
    let sortedFilteredReviews = [];
    let slicedReviews = [];
    let moreReviewsButton;

    if (reviewsList) {
      let list = reviewsList.results;
      if (sortBy === 'newest') {
        sortedReviews = list.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortBy === 'helpful') {
        sortedReviews = list.sort((a, b) => b.helpfulness - a.helpfulness);
      } else {
        sortedReviews = list.sort((a, b) => {
          if (a.helpfulness === b.helpfulness) {
            return new Date(b.date) - new Date(a.date);
          }
          return b.helpfulness - a.helpfulness;
        });
      }
      if (sortedReviews.length > 0) {
        for (let i = 0; i < sortedReviews.length; i += 1) {
          if (filterState.includes(sortedReviews[i].rating.toString())) {
            sortedFilteredReviews.push(sortedReviews[i]);
          }
        }
      }
      if (sortedFilteredReviews.length === 0) {
        console.log('line here');
        sortedFilteredReviews = sortedReviews;
      }

      slicedReviews = sortedFilteredReviews.slice(0, sliceBy);
      if (sliceBy < list.length) {
        moreReviewsButton = <button type="button" onClick={this.showMoreReviews}>MORE REVIEWS</button>;
      } else {
        moreReviewsButton = <button type="button" onClick={this.showLessReviews}>REVERT TO NORMAL VIEW</button>;
      }
      // console.log('list', reviewsList.results);
    }

    const sortDropdown = (
      <select onChange={this.handleDropdownSelect.bind(this)} name="Sort" id="SortDropdown">
        <option value="relevance">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    );
    const createReviewElement = renderCreate ? (
      <PageBlockerModalDiv>
        <Modal>
          <CreateReview
            metaInfo={reviewsMeta}
            toggleCreateReviewModal={this.toggleCreateReviewModal}
            productName={productName}
          />
        </Modal>
      </PageBlockerModalDiv>
    )
      : '';

    return (
      <div id="tiles">
        <p>
          {sortedFilteredReviews.length}
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

ReviewsList.propTypes = {
  reviewsMeta: PropTypes.object,
  filterState: PropTypes.array,
  // productId: PropTypes.string.isRequired,
};

ReviewsList.defaultProps = {
  filterState: [],
  reviewsMeta: {},
};

export default ReviewsList;


// let sortedReviews;
//     if (sortBy === 'newest') {
//       sortedReviews = reviewsData.sort((a, b) => new Date(b.date) - new Date(a.date));
//     } else if (sortBy === 'helpful') {
//       sortedReviews = reviewsData.sort((a, b) => b.helpfulness - a.helpfulness);
//     } else {
//       sortedReviews = reviewsData.sort((a, b) => {
//         if (a.helpfulness === b.helpfulness) {
//           return new Date(b.date) - new Date(a.date);
//         }
//         return b.helpfulness - a.helpfulness;
//       });
//     }
//     let sortedFilteredReviews = [];
//     if (sortedReviews.length > 0) {
//       for (let i = 0; i < sortedReviews.length; i += 1) {
//         if (filterState.includes(sortedReviews[i].rating.toString())) {
//           sortedFilteredReviews.push(sortedReviews[i]);
//         }
//       }
//     }
//     if (sortedFilteredReviews.length === 0) {
//       sortedFilteredReviews = sortedReviews;
//     }

//     const slicedReviews = sortedFilteredReviews.slice(0, sliceBy) || [];
//     let moreReviewsButton;
//     if (sliceBy < reviewsData.length) {
//       moreReviewsButton = <button type="button" onClick={this.showMoreReviews}>MORE REVIEWS</button>;
//     } else {
//       moreReviewsButton = <button type="button" onClick={this.showLessReviews}>REVERT TO NORMAL VIEW</button>;
//     }


