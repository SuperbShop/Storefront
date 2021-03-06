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
  width: 250px;
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
  &:hover {
    color: rgb(128, 128, 128);
  }
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

  sortReviews() {
    const { reviewsList } = this.props;
    const { sortBy } = this.state;
    const list = reviewsList.results;
    if (reviewsList) {
      if (sortBy === 'newest') {
        return list.sort((a, b) => new Date(b.date) - new Date(a.date));
      } if (sortBy === 'helpful') {
        return list.sort((a, b) => b.helpfulness - a.helpfulness);
      }
      return list.sort((a, b) => {
        if (a.helpfulness === b.helpfulness) {
          return new Date(b.date) - new Date(a.date);
        }
        return b.helpfulness - a.helpfulness;
      });
    }
  }

  filterReviews(array) {
    const { filterState } = this.props;
    let sortedFilteredArray = [];
    if (array.length > 0) {
      for (let i = 0; i < array.length; i += 1) {
        if (filterState.includes(array[i].rating.toString())) {
          sortedFilteredArray.push(array[i]);
        }
      }
    }
    if (sortedFilteredArray.length === 0) {
      sortedFilteredArray = array;
    }
    return sortedFilteredArray;
  }

  render() {
    const {
      sliceBy,
      renderCreate,
    } = this.state;
    const {
      reviewsList,
      reviewsMeta,
      productName,
      fetchReviewsList,
    } = this.props;
    const sortedReviews = this.sortReviews();
    const sortedFilteredReviews = this.filterReviews(sortedReviews);
    const numberOfReviews = reviewsList.results.length;
    const slicedReviews = sortedFilteredReviews.slice(0, sliceBy);
    let moreReviewsButton;
    if (sliceBy < numberOfReviews) {
      moreReviewsButton = <ListControlButton type="button" onClick={this.showMoreReviews}>SEE MORE REVIEWS</ListControlButton>;
    } else if (numberOfReviews >= 0 && numberOfReviews <= 2) {
      moreReviewsButton = '';
    } else {
      moreReviewsButton = <ListControlButton type="button" onClick={this.showLessReviews}>REVERT TO NORMAL VIEW</ListControlButton>;
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
            fetchReviewsList={fetchReviewsList}
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
          {slicedReviews.map((item) => (
            <ReviewTile
              key={item.review_id}
              fetchReviewsList={fetchReviewsList}
              review={item}
            />
          ))}
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
  fetchReviewsList: PropTypes.func.isRequired,
};

export default ReviewsList;
