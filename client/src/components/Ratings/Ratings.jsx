import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Breakdown from './Breakdown';
import ReviewsList from './ReviewsList';
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
      .then(() => {
        fetch.listGetter(product)
          .then((res2) => {
            this.setState({
              reviewsData: res2,
            });
          });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const productNum = this.props.product;
    const reviewMetaInfo = this.state.reviewsMetaData;
    const reviewListInfo = this.state.reviewsData;
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
            <ReviewsList productNum={productNum} list={reviewListInfo} />
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
