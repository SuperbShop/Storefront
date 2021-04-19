import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { farStar } from '@fortawesome/free-regular-svg-icons';
import ReactStars from 'react-rating-stars-component';

const StarWrapper = styled.div`
  display: flex;
`;
const ReviewWrapper = styled.div`
  font-size: 12px;
  padding-top: 5px;
`;

class StarRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <StarWrapper>
        <ReactStars
          size={20}
          edit
          isHalf
          // emptyIcon={<FontAwesomeIcon icon={farStar} />}
          // halfIcon={<FontAwesomeIcon icon={faStarHalfAlt} />}
          // filledIcon={<FontAwesomeIcon icon={faStar} />}
        />
        <ReviewWrapper><a href="#Reviews">Read all reviews</a></ReviewWrapper>
      </StarWrapper>
    );
  }
}

export default StarRatings;
