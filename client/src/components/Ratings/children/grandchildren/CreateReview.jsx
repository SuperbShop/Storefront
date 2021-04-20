import React from 'react';

class CreateReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // product idk
    };
  }

  handleFormSubmission() {
    // post to API - need the url meaning we need the item ID passed down through props
  }

  render() {
    return (
      <div>
        <form id="create-new-review" method="post">
          <strong>
            Create A Review for
            {this.props.productId}
          </strong>

          <div id="overall-rating">
            Star Ratings:*
            <input id="star-rating" required="required" type="text" />
          </div>

          <div id="recommend">
            Do you recommend this product?*
            <input type="radio" id="YesRecommend" required="required" name="RecommendOption" value="Yes" />
            <label htmlFor="YesRecommend">Yes</label>
            <input type="radio" id="NoRecommend" name="RecommendOption" value="No" />
            <label htmlFor="NoRecommend">No</label>
          </div>

          <div id="characteristics">
            Grade the characteristics here*
          </div>

          <div id="ReviewSummary">
            Review summary:
            <input id="ReviewSummaryText" maxLength="60" type="text" placeholder="Example: Best purchase ever!" />
          </div>

          <div id="ReviewBody">
            Review body:*
            <input id="ReviewBodyText" required="required" minLength="50" maxLength="1000" type="text" placeholder="Why did you like the product or not?" />
          </div>

          <div id="UploadYourPhotos">
            Upload your photos:
            <button type="button">Upload here</button>
          </div>

          <div id="WhatIsYourNickname">
            What is your nickname?*
            <input id="WhatIsYourNicknameText" required="required" maxLength="60" type="text" placeholder="Example: jackson11!" />
            For privacy reasons, do not use your full name or email address
          </div>

          <div id="WhatIsYourEmail">
            What is your email?*
            <input id="WhatIsYourEmailText" required="required" maxLength="60" type="text" placeholder="Example: jackson11@email.com" />
            For authentication reasons, you will not be emailed
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateReview;
