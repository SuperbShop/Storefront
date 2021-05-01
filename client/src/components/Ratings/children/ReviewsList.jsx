import React from 'react';
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

const ListControlButton = styled.button`
  margin-top: 10px;
  margin-bottom: 25px;
  margin-left: 10px;
  padding: 15px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #838383;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px 0px;
  &:hover {
    background-color: black;
    color: white;
  };
  &:focus {
    outline-color: none;
  }
  `;

const SortSelect = styled.select`
  cursor: pointer;
  border: none;
  text-decoration: underline;
  `;

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCreate: false,
      sortBy: 'relevance',
      sliceBy: 2,
    };

    this.toggleCreateReviewModal = this.toggleCreateReviewModal.bind(this);
    this.showMoreReviews = this.showMoreReviews.bind(this);
    this.showLessReviews = this.showLessReviews.bind(this);
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
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
    this.setState((prevState) => ({
      renderCreate: !prevState.renderCreate,
    }));
  }

  showLessReviews() {
    this.setState({
      sliceBy: 2,
    });
  }

  showMoreReviews() {
    this.setState((prevState) => ({
      sliceBy: prevState.sliceBy + 4,
    }));
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
      const list = reviewsList.results;
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
        sortedFilteredReviews = sortedReviews;
      }

      slicedReviews = sortedFilteredReviews.slice(0, sliceBy);
      if (sliceBy < list.length) {
        moreReviewsButton = <ListControlButton type="button" onClick={this.showMoreReviews}>MORE REVIEWS</ListControlButton>;
      } else if (list.length >= 0 && list.length <= 2) {
        moreReviewsButton = '';
      } else {
        moreReviewsButton = <ListControlButton type="button" onClick={this.showLessReviews}>REVERT TO NORMAL VIEW</ListControlButton>;
      }
    }

    const sortDropdown = (
      <SortSelect onChange={this.handleDropdownSelect} name="Sort" id="SortDropdown">
        <option value="relevance">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </SortSelect>
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
      <div id="tiles" data-testid="reviewslist-1">
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
        <ListControlButton type="button" onClick={this.toggleCreateReviewModal}>ADD A REVIEW</ListControlButton>
        {createReviewElement}
      </div>
    );
  }
}

ReviewsList.propTypes = {
  productName: PropTypes.string.isRequired,
  reviewsList: PropTypes.shape({
    product: PropTypes.string,
    page: PropTypes.number,
    count: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  reviewsMeta: PropTypes.shape({
    ratings: PropTypes.shape({
      1: PropTypes.string,
      2: PropTypes.string,
      3: PropTypes.string,
      4: PropTypes.string,
      5: PropTypes.string,
    }).isRequired,
    characteristics: PropTypes.shape({
      Fit: PropTypes.shape({}),
      Length: PropTypes.shape({}),
      Comfort: PropTypes.shape({}),
      Quality: PropTypes.shape({}),
      Size: PropTypes.shape({}),
      Width: PropTypes.shape({}),
    }).isRequired,
    recommended: PropTypes.shape({}),
  }).isRequired,
  filterState: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ReviewsList;
