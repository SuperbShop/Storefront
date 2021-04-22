import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Distribution from './grandchildren/Distribution';
import ProductFactors from './grandchildren/ProductFactors';

const BreakdownSection = styled.section`
  display: flex;
  flex-direction: column;
  `;

const OverallScoreh2 = styled.h2`
  font-size: 60px;
  margin-left: 5%;
  `;

const PercentLine = styled.p`
  margin-left: 5%;
  `;

const ScoreAndStarsContainer = styled.div`
  display: flex;
  border: 1px solid green;
  `;

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  margin-left: 3%;
  `;

class Breakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // avgRating: 0,
      // percentThatRecommend: 0,
    };
  }

  render() {
    let reviewSum = 0;
    let reviewQuantity = 0;
    let percent = 0;
    let average = 0;
    let ratingsDist;
    let productChars;
    if (this.props.meta !== undefined) {
      const ratingsArray = Object.keys(this.props.meta.ratings);
      for (let i = 0; i < ratingsArray.length; i += 1) {
        reviewSum += ratingsArray[i] * this.props.meta.ratings[ratingsArray[i]];
        reviewQuantity += Number(this.props.meta.ratings[ratingsArray[i]]);
      }
      average = (reviewSum / reviewQuantity).toFixed(1);
      percent = (100 * (Number(this.props.meta.recommended.true) / reviewQuantity)).toFixed(0) || 0;
      ratingsDist = this.props.meta.ratings;
      productChars = this.props.meta.characteristics;
    }
    // need to incorporate the star graphi
    return (
      <BreakdownSection>
        <ScoreAndStarsContainer>
          <OverallScoreh2>
            {average}
          </OverallScoreh2>
          <StarsContainer>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </StarsContainer>
        </ScoreAndStarsContainer>
        <PercentLine>
          {percent}
          % of reviews recommend this product
        </PercentLine>
        <section>
          <Distribution filterBy={this.props.filterBy} dist={ratingsDist} />
          <ProductFactors productNum={this.props.productNum} chars={productChars} />
        </section>
      </BreakdownSection>
    );
  }
}

Breakdown.propTypes = {
  productNum: PropTypes.string.isRequired,
  meta: PropTypes.object
};

export default Breakdown;
