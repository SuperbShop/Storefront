import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Breakdown from './children/Breakdown';
import ReviewsList from './children/ReviewsList';
import fetch from './fetchers';

const RatingsWidgetWrapper = styled.div`
  margin-top: 70px;
  margin-bottom: 100px;
  `;

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

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterState: [],
      fetchersError: false,
    };

    this.handleFilterBy = this.handleFilterBy.bind(this);
  }

  componentDidMount() {
    const { product } = this.props;

    Promise.all([
      fetch.metaGetter(product),
      fetch.listGetter(product),
      fetch.productGetter(product),
    ])
      .then(((values) => {
        this.setState({
          reviewsMeta: values[0],
          reviewsList: values[1],
          productName: values[2].name,
          productId: values[2].id,
        });
      }))
      .catch(() => {
        this.setState({
          fetchersError: true,
        });
      });
  }

  handleFilterBy(value) {
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
    const {
      reviewsMeta,
      reviewsList,
      productName,
      productId,
      filterState,
      fetchersError,
    } = this.state;
    return (
      <RatingsWidgetWrapper>
        <h2>
          Ratings & Reviews
        </h2>
        { fetchersError && (
          <h4>Something went wrong</h4>
        )}
        { this.state && productId
          && fetchersError === false && (
          <ReviewsAndRatingsDiv>
            <BreakdownWrapper>
              <Breakdown
                key={productId}
                filterFunc={this.handleFilterBy}
                productId={productId}
                reviewsMeta={reviewsMeta}
              />
            </BreakdownWrapper>
            <ListWrapper>
              <ReviewsList
                productName={productName}
                reviewsList={reviewsList}
                filterState={filterState}
                reviewsMeta={reviewsMeta}
              />
            </ListWrapper>
          </ReviewsAndRatingsDiv>
        )}
      </RatingsWidgetWrapper>
    );
  }
}

Ratings.propTypes = {
  product: PropTypes.number.isRequired,
};

export default Ratings;
