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
      filterState: [],
    };

    this.handleFilterBy = this.handleFilterBy.bind(this);
  }

  componentDidMount() {
    const { product } = this.props;
    // console.log('componentdidmount', this.props.product)
    // fetch.metaGetter(product)
    //   .then((res) => {
    //     console.log('fetched meta', res);
    //     this.setState({
    //       reviewsMetaData: res,
    //     }, () => console.log('state set'));
    //   })
    //   .catch((err) => console.error(err));

    Promise.all([
      fetch.metaGetter(product),
      fetch.listGetter(product),
      fetch.productGetter(product),
    ])
    .then((values => {
      this.setState({
        reviewsMeta: values[0],
        reviewsList: values[1],
        productName: values[2].name,
        productId: values[2].id,
      }) /*console.log('state', this.state);*/
    }))
    .catch((err) => console.error(err));
  }

  handleFilterBy(value) {
    // console.log('fromratings value', value);
    if (value === 0) {
      const emptyFilterState = [];
      this.setState({
        filterState: emptyFilterState,
      });
    } else {
      const { filterState } = this.state;
      let newFilterState = [];
      newFilterState = filterState.slice();
      if (!newFilterState.includes(value)) {
        newFilterState.push(value);
      } else {
        const index = newFilterState.indexOf(value);
        newFilterState.splice(index, 1);
      }
      this.setState({
        filterState: newFilterState,
      });
    }
  }

  render() {
    const { product } = this.props;
    const { reviewsMeta, reviewsList, productName, productId, filterState } = this.state;
    return (
      <>
        <StyledTitle>
          Ratings & Reviews
        </StyledTitle>
        <ReviewsAndRatingsDiv>
          <BreakdownWrapper>
            <Breakdown key={productId} filterFunc={this.handleFilterBy} productId={productId} reviewsMeta={reviewsMeta} />
          </BreakdownWrapper>
          <ListWrapper>
            <ReviewsList filterState={filterState} reviewsMeta={reviewsMeta} productId={productId} />
          </ListWrapper>
        </ReviewsAndRatingsDiv>
      </>
    );
  }
}

Ratings.propTypes = {
  product: PropTypes.number.isRequired,
};

export default Ratings;
