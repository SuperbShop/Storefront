import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
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
  `;

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  margin-left: 3%;
  `;

const StarsOuter = styled.div`
  display: inline-block;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  `;

const Breakdown = (props) => {
  let reviewSum = 0;
  let reviewQuantity = 0;
  let percent = 0;
  let average = 0;
  let averagePercentage = 0;
  let ratingsDist;
  let productChars;
  const { meta, filterBy, productNum } = props;
  if (meta !== undefined) {
    const ratingsArray = Object.keys(meta.ratings);
    for (let i = 0; i < ratingsArray.length; i += 1) {
      reviewSum += ratingsArray[i] * meta.ratings[ratingsArray[i]];
      reviewQuantity += Number(meta.ratings[ratingsArray[i]]);
    }
    average = (reviewSum / reviewQuantity).toFixed(1);
    percent = (100 * (Number(meta.recommended.true) / reviewQuantity)).toFixed(0) || 0;
    ratingsDist = meta.ratings;
    productChars = meta.characteristics;
    averagePercentage = average / 5;
  }
  const StarsInner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
    width: ${(averagePercentage) * 100}%;
    `;
  return (
    <BreakdownSection>
      <ScoreAndStarsContainer>
        <OverallScoreh2>
          {average}
        </OverallScoreh2>
        <StarsContainer>
          <StarsOuter>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <StarsInner>
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
            </StarsInner>
          </StarsOuter>
        </StarsContainer>
      </ScoreAndStarsContainer>
      <PercentLine>
        {percent}
        % of reviews recommend this product
      </PercentLine>
      <section>
        <Distribution filterBy={filterBy} dist={ratingsDist} />
        <ProductFactors productNum={productNum} chars={productChars} />
      </section>
    </BreakdownSection>
  );
};

Breakdown.propTypes = {
  productNum: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    ratings: PropTypes.object,
    productId: PropTypes.string,
    characteristics: PropTypes.object,
    recommended: PropTypes.object,
  }),
  filterBy: PropTypes.func,
};

// Breakdown.defaultProps = {
//   meta: {},
//   filterBy: {},
// };

export default Breakdown;
