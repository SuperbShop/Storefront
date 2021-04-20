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
  width: 300px;
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
      // filterBy: (for reviewList rendering) - need to pass this down to ReviewsList
    };
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
            <Breakdown productNum={productNum} meta={reviewMetaInfo} />
          </BreakdownWrapper>
          <ListWrapper>
            <ReviewsList productNum={productNum} />
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
