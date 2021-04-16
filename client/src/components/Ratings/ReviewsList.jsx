import React from 'react';
import ReviewTile from './children/ReviewTile';

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
      </div>
    );
  }
}

export default ReviewsList;
