import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import PropTypes from 'prop-types';

const StarRatingWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
`;
const ReviewWrapper = styled.div`
  font-size: 12px;
  padding-top: 3px;
  padding-left: 5px;
`;

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarsOuter = styled.div`
  display: inline-block;
  position: relative;
  overflow-x: hidden;
  color: rgb(128, 128, 128);
  `;

const StarsInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  color: #EFC050;
  `;

const calculateAvgRatings = (ratings) => {
  let totalRating = 0;
  let avgRating = 0;
  let averagePercentage = 0;
  const totalCount = ratings.length;
  ratings.forEach((item) => {
    totalRating += item.rating;
  });
  avgRating = (totalRating / totalCount);
  averagePercentage = avgRating / 5;
  $('.StarsInner').width(`${averagePercentage * 100}%`);
};
const StarRating = ({ ratings }) => {
  if (ratings.length > 0) {
    calculateAvgRatings(ratings);
    return (
      <StarRatingWrapper data-testid="starRating">
        <StarsContainer>
          <StarsOuter>
            <FontAwesomeIcon key={1} icon={faStar} />
            <FontAwesomeIcon key={2} icon={faStar} />
            <FontAwesomeIcon key={3} icon={faStar} />
            <FontAwesomeIcon key={4} icon={faStar} />
            <FontAwesomeIcon key={5} icon={faStar} />
            <StarsInner className="StarsInner">
              <FontAwesomeIcon key={10} icon={solidStar} />
              <FontAwesomeIcon key={11} icon={solidStar} />
              <FontAwesomeIcon key={12} icon={solidStar} />
              <FontAwesomeIcon key={13} icon={solidStar} />
              <FontAwesomeIcon key={14} icon={solidStar} />
            </StarsInner>
          </StarsOuter>
        </StarsContainer>
        <ReviewWrapper>
          <a href="#Reviews">
            Read
            {' '}
            {ratings.length}
            {' '}
            reviews
          </a>
        </ReviewWrapper>
      </StarRatingWrapper>
    );
  }
  return null;
};

StarRating.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default StarRating;
