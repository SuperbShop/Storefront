import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Breakdown from './Breakdown';
import ReviewsList from './ReviewsList';

const ReviewsAndRatingsDiv = styled.section`
  padding: 5px;
  background-color: lightblue;
  display: flex;
  justify-content: space-evenly;
  `;

const BreakdownWrapper = styled.div`
  background-color: lightgrey;
  width: 300px;
  `;

const ListWrapper = styled.div`
  background-color: lightgreen;
  width: 800px;
  `;

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // property: true,
      // make state equal to props.product
    };
  }
  // pass props from above into Breakdown & ReviewsList

  render() {
    const productNum = this.props.product;
    return (
      <section>
        <h2>Ratings & Reviews</h2>
        <ReviewsAndRatingsDiv>
          <BreakdownWrapper>
            <Breakdown productNum={productNum} />
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
