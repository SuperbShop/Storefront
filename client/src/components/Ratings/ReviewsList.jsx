import React from 'react';
import ReviewTile from './children/ReviewTile';
import CreateReview from './children/CreateReview';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // tiles: 2,
    };
  }

  render() {
    return (
      <div id="tiles">
        <p>This is the ReviewsList component</p>
        <ReviewTile />
        <ReviewTile />
        <p>Hardcoded CreateReview</p>
        <CreateReview />
      </div>
    );
  }
}

export default ReviewsList;
