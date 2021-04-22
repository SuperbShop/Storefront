import React from 'react';
import styled from 'styled-components';

const CenteredDiv = styled.div`
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  top: 30%;
  bottom: 0;
  margin: auto;
  width: 90%;
  height: 70%;
  text-align:center;
  box-shadow: 0 5px 10px 2px rgba(195,192,192,.5);
  border: 2px solid green;
  `;

const ExitButtonWrapper = styled.div`
  position: absolute;
  right: 2px;
  top: 2px;
  `;

const FormChildrenContainer = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 80px;
  line-height: 1.7em;
  `;

const EachInputWrapper = styled.div`
  `;

const ModalTitleWrapper = styled.div`
  border: 1px solid blue;
  `;

const CharsRadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  `;

const radioRowWrapper = styled.div`
  display: flex;
  `;

class CreateReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // product idk
    };
    this.handleExitButtonClick = this.handleExitButtonClick.bind(this);
  }

  handleFormSubmission() {
    // post to API - need the url meaning we need the item ID passed down through props
  }

  handleExitButtonClick() {
    this.props.toggleCreateReviewModal();
  }

  renderCharsRadioButtons(name, lowest, highest) {
    return (
      <>
        {name}
        <radioRowWrapper>
        <input type="radio" required="required" name="RecommendOption" value={lowest} />
        <input type="radio" required="required" name="RecommendOption" value="Yes" />
        <input type="radio" required="required" name="RecommendOption" value="Yes" />
        <input type="radio" required="required" name="RecommendOption" value="Yes" />
        <input type="radio" required="required" name="RecommendOption" value={highest} />
        </radioRowWrapper>
      </>
    )
  }

  render() {
    console.log('fromcreate', this.props);

    let charsSelector = 'yo';
    var charsArray = Object.keys(this.props.metaInfo.characteristics);
    console.log(charsArray);

    return (
      <>
      <CenteredDiv>
        <form id="create-new-review" method="post">
          <FormChildrenContainer>
            <ModalTitleWrapper>
          <strong>
            Create A Review for
            {this.props.productId}
          </strong>
            </ModalTitleWrapper>

          <EachInputWrapper id="overall-rating">
            Star Ratings:*
            <input id="star-rating" required="required" type="text" />
          </EachInputWrapper>

          <EachInputWrapper id="recommend">
            Do you recommend this product?*
            <input type="radio" id="YesRecommend" required="required" name="RecommendOption" value="Yes" />
            <label htmlFor="YesRecommend">Yes</label>
            <input type="radio" id="NoRecommend" name="RecommendOption" value="No" />
            <label htmlFor="NoRecommend">No</label>
          </EachInputWrapper>

          <EachInputWrapper id="characteristics">
            Please rate the product's characteristics*
            <CharsRadioWrapper>
              {charsArray.map(char => {
                return this.renderCharsRadioButtons(char, 'low', 'high');
              })}
            </CharsRadioWrapper>
          </EachInputWrapper>

          <EachInputWrapper id="ReviewSummary">
            Review summary:
            <textarea id="ReviewSummaryText" maxLength="60" type="text" placeholder="Example: Best purchase ever!" />
          </EachInputWrapper>

          <EachInputWrapper id="ReviewBody">
            Review body:*
            <textarea id="ReviewBodyText" required="required" minLength="50" maxLength="1000" type="text" placeholder="Why did you like the product or not?" />
          </EachInputWrapper>

          <EachInputWrapper id="UploadYourPhotos">
            Upload your photos:
            <button type="button">Upload here</button>
          </EachInputWrapper>

          <EachInputWrapper id="WhatIsYourNickname">
            What is your nickname?*
            <input id="WhatIsYourNicknameText" required="required" maxLength="60" type="text" placeholder="Example: jackson11!" />
            For privacy reasons, do not use your full name or email address
          </EachInputWrapper>

          <EachInputWrapper id="WhatIsYourEmail">
            What is your email?*
            <input id="WhatIsYourEmailText" required="required" maxLength="60" type="text" placeholder="Example: jackson11@email.com" />
            For authentication reasons, you will not be emailed
          </EachInputWrapper>

          <button type="submit">Submit</button>
          </FormChildrenContainer>
        </form>
          <ExitButtonWrapper>
            <button id="exitbutton" onClick={this.handleExitButtonClick}>X</button>
          </ExitButtonWrapper>
        </CenteredDiv>
        </>
    );
  }
}

export default CreateReview;
