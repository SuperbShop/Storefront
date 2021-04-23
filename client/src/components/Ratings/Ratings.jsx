import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Breakdown from './children/Breakdown';
import ReviewsList from './children/ReviewsList';
import fetch from './fetchers';

const ReviewsAndRatingsDiv = styled.section`
  padding: 5px;
  display: flex;
  justify-content: space-evenly;
  `;

const BreakdownWrapper = styled.div`
  width: 350px;
  `;

const ListWrapper = styled.div`
  width: 800px;
  `;

const StyledTitle = styled.h2`
  `;

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: [],
    };

    this.handleFilterBy = this.handleFilterBy.bind(this);
  }

  componentDidMount() {
    const { product } = this.props;
    fetch.metaGetter(product)
      .then((res) => {
        this.setState({
          reviewsMetaData: res,
        });
      })
      .catch((err) => console.error(err));
  }

  handleFilterBy(value) {
    const { filterBy } = this.state;
    let newFilterState = [];
    newFilterState = filterBy.slice();
    // const newFilterState = this.state.filterBy.slice();
    if (!newFilterState.includes(value)) {
      newFilterState.push(value);
    } else {
      const index = newFilterState.indexOf(value);
      newFilterState.splice(index, 1);
    }
    this.setState({
      filterBy: newFilterState,
    });
  }

  render() {
    const { product } = this.props;
    const { reviewsMetaData, filterBy } = this.state;
    return (
      <>
        <StyledTitle>
          Ratings & Reviews
        </StyledTitle>
        <ReviewsAndRatingsDiv>
          <BreakdownWrapper>
            <Breakdown filterBy={this.handleFilterBy} productNum={product} meta={reviewsMetaData} />
          </BreakdownWrapper>
          <ListWrapper>
            <ReviewsList filterState={filterBy} meta={reviewsMetaData} productNum={product} />
          </ListWrapper>
        </ReviewsAndRatingsDiv>
      </>
    );
  }
}

Ratings.propTypes = {
  product: PropTypes.string.isRequired,
};

export default Ratings;
