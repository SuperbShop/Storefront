import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Distribution from './children/Distribution';
import ProductFactors from './children/ProductFactors';

const BreakdownSection = styled.section`
  display: flex;
  flex-direction: column;
  `;

const OverallScoreh2 = styled.h2`
  font-size: 50px;h2
  color: blue;
  `;

const ScoreAndStarsContainer = styled.div`
  display: flex;
  background-color: pink;
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
      average = reviewSum / reviewQuantity;
      percent = 100 * (Number(this.props.meta.recommended.true) / reviewQuantity) || 0;
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
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </ScoreAndStarsContainer>
        <p>
          {percent}
          % of reviews recommend this product
        </p>
        <section>
          <Distribution dist={ratingsDist} />
          <ProductFactors chars={productChars} />
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
