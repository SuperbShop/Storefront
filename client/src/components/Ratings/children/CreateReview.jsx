import React from 'react';

class CreateReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // product idk
    };
  }

  render() {
    return (
      <div>
        <form id="create-new-review" method="post">
          <strong>Create A Review</strong>
          <p>Star Ratings:</p>
          <input id="star-rating" type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateReview;
