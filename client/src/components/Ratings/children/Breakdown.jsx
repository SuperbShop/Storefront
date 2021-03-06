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
  color: rgb(128, 128, 128);
  display: inline-block;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  `;

const StarsInner = styled.div`
  color: #EFC050;
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  `;

const Breakdown = (props) => {
  const { reviewsMeta, filterFunc, productId } = props;
  let reviewSum = 0;
  let reviewQuantity = 0;
  let percent = 0;
  let average = 0;
  let averagePercentage = 0;
  let ratings;
  let productChars;
  if (reviewsMeta !== undefined) {
    const ratingsArray = Object.keys(reviewsMeta.ratings);
    for (let i = 0; i < ratingsArray.length; i += 1) {
      reviewSum += ratingsArray[i] * reviewsMeta.ratings[ratingsArray[i]];
      reviewQuantity += Number(reviewsMeta.ratings[ratingsArray[i]]);
    }
    average = (reviewSum / reviewQuantity).toFixed(1);
    percent = (100 * (Number(reviewsMeta.recommended.true) / reviewQuantity)).toFixed(0) || 0;
    ratings = reviewsMeta.ratings;
    productChars = reviewsMeta.characteristics;
    averagePercentage = average / 5;
  }

  const innerStarWidth = {
    width: `${averagePercentage * 100}%`,
  };

  return (
    <BreakdownSection data-testid="breakdown-1">
      <ScoreAndStarsContainer>
        <OverallScoreh2>
          {average}
        </OverallScoreh2>
        <StarsContainer>
          <StarsOuter>
            <FontAwesomeIcon key={1} icon={faStar} />
            <FontAwesomeIcon key={2} icon={faStar} />
            <FontAwesomeIcon key={3} icon={faStar} />
            <FontAwesomeIcon key={4} icon={faStar} />
            <FontAwesomeIcon key={5} icon={faStar} />
            <StarsInner style={innerStarWidth} className="StarsInside">
              <FontAwesomeIcon key={10} icon={solidStar} />
              <FontAwesomeIcon key={11} icon={solidStar} />
              <FontAwesomeIcon key={12} icon={solidStar} />
              <FontAwesomeIcon key={13} icon={solidStar} />
              <FontAwesomeIcon key={14} icon={solidStar} />
            </StarsInner>
          </StarsOuter>
        </StarsContainer>
      </ScoreAndStarsContainer>
      <PercentLine>
        {percent}
        % of reviews recommend this product
      </PercentLine>
      <section>
        <Distribution filterFunc={filterFunc} ratings={ratings} />
        <ProductFactors productId={productId} chars={productChars} />
      </section>
    </BreakdownSection>
  );
};

Breakdown.propTypes = {
  productId: PropTypes.number.isRequired,
  reviewsMeta: PropTypes.shape({
    ratings: PropTypes.shape({}),
    characteristics: PropTypes.shape({
      Fit: PropTypes.shape({}),
      Length: PropTypes.shape({}),
      Comfort: PropTypes.shape({}),
      Quality: PropTypes.shape({}),
      Size: PropTypes.shape({}),
      Width: PropTypes.shape({}),
    }),
    recommended: PropTypes.shape({
      true: PropTypes.string,
    }),
  }).isRequired,
  filterFunc: PropTypes.func.isRequired,
};

export default Breakdown;
