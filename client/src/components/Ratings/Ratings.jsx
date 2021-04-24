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
    console.log('componentdidmount', this.props.product)
    fetch.metaGetter(product)
      .then((res) => {
        console.log('fetched meta', res);
        this.setState({
          reviewsMetaData: res,
        }, () => console.log('state set'));
      })
      .catch((err) => console.error(err));

    // Promise.all([
    //   fetch.metaGetter(product),
    //   fetch.listGetter(product),
    // ])
    // .then((values => console.log('promiseall', values)));
  }

  handleFilterBy(value) {
    if (value === 0) {
      const emptyFilterState = [];
      this.setState({
        filterBy: emptyFilterState,
      });
    } else {
      const { filterBy } = this.state;
      let newFilterState = [];
      newFilterState = filterBy.slice();
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
  }

  render() {
    const { product } = this.props;
    console.log('ratings', product);
    const { reviewsMetaData, filterBy } = this.state;
    return (
      <>
        <StyledTitle>
          Ratings & Reviews
        </StyledTitle>
        <ReviewsAndRatingsDiv>
          <BreakdownWrapper>
            <Breakdown key={product} filterBy={this.handleFilterBy} productNum={product} meta={reviewsMetaData} />
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
  product: PropTypes.number.isRequired,
};

export default Ratings;
