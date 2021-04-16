import React from 'react';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // state idk
    };
  }

  render() {
    return (
      <div id="review-tile">
        <p>Star Rating</p>
        <strong>Review summary text</strong>
        <p>I recommend this product - checkmark</p>
        <p>Review body</p>
        <p>Sales team response</p>
        <button type="button">Helpful?</button>
      </div>
    );
  }
}

export default ReviewTile;
