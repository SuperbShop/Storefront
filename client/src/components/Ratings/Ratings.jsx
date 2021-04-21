import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Breakdown from './children/Breakdown';
import ReviewsList from './children/ReviewsList';
import fetch from './fetchers.js';

const ReviewsAndRatingsDiv = styled.section`
  padding: 5px;
  background-color: lightgrey;
  display: flex;
  justify-content: space-evenly;
  `;

const BreakdownWrapper = styled.div`
  background-color: lightblue;
  width: 350px;
  `;

const ListWrapper = styled.div`
  background-color: lightgreen;
  width: 800px;
  `;

const StyledTitle = styled.h2`
  color: red;
  `;

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // reviewsMetaData: {},
      // reviewsData: {},
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
    let newFilterState = this.state.filterBy.slice();
    if (!newFilterState.includes(value)) {
      newFilterState.push(value);
    } else {
      let index = newFilterState.indexOf(value);
      newFilterState.splice(index, 1);
    }
    this.setState({
      filterBy: newFilterState,
    });
  }

  render() {
    const productNum = this.props.product;
    const reviewMetaInfo = this.state.reviewsMetaData;
    return (
      <section>
        <StyledTitle>
          Ratings & Reviews
        </StyledTitle>
        <ReviewsAndRatingsDiv>
          <BreakdownWrapper>
            <Breakdown filterBy={this.handleFilterBy} productNum={productNum} meta={reviewMetaInfo} />
          </BreakdownWrapper>
          <ListWrapper>
          <ReviewsList filterState={this.state.filterBy} productNum={productNum} />
          </ListWrapper>
        </ReviewsAndRatingsDiv>
      </section>
    );
  }
}

Ratings.propTypes = {
  product: PropTypes.string.isRequired,
};

export default Ratings;
