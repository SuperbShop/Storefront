import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import config from '../../../../../../config.js';

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
const EachInputWrapper = styled.div`
  border: 1px solid grey;
  min-height: 15%;
  width: 100%;
  `;
const ExitButtonWrapper = styled.div`
  position: absolute;
  right: 2px;
  top: 2px;
  `;

const FloatLeft = styled.div`
  position: absolute;
  width: 50%;
  left: 0;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 80%;
  `;
const FloatRight = styled.div`
  width: 50%;
  position:absolute;
  right: 0;
  border: 1px solid blue;
  `;

const SubmitWrapper = styled.div`
  position: absolute;
  bottom: 5%;
  width: 100%;
  `;

// const CharWorstBestWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: 12px;
//   `;

// const CharsRadioWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   `;

// const RadioRowWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   `;
const HiddenRating = styled.input`
  display: none;
  `;

const StarsInner = styled.div`
      position: absolute;
      top: 0;
      left: 0;
      white-space: nowrap;
      overflow: hidden;
      width: 50%
      `;
const StarsOuter = styled.div`
  display: inline-block;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  `;

class CreateReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // product idk
    };
    this.charsObject = {
      "Size": ["A size too small", "1/2 a size too small", "Perfect", "1/2 a size too big", "A size too wide"],
      "Width": ["Too narrow", "Slightly narrow", "Perfect", "Slightly wide", "Too wide"],
      "Comfort": ["Uncomfortable", "Slighty uncomfortable", "Ok", "Comfortable", "Perfect"],
      "Quality": ["Poor", "Below average", "What I expected", "Pretty great", "Perfect"],
      "Length": ["Runs short", "Runs slightly short", "Perfect", "Runs slightly long", "Runs long"],
      "Fit": ["Runs tight", "Runs slightly tight", "Perfect", "Runs slightly long", "Runs long"],
    };
    this.handleExitButtonClick = this.handleExitButtonClick.bind(this);
    this.handleCharRadioClick = this.handleCharRadioClick.bind(this);
    this.updateLengthDetails = this.updateLengthDetails.bind(this);
    this.logfiles = this.logfiles.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    // request to get the product name
    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${this.props.productId}`,
      headers: {
        'Authorization': config.API_KEY,
      },
      success: (data) => this.setState({ productName: data.name}),
      error: (err) => console.log(err),
    });
  }

  handleFormSubmission() {
    // post to API - need the url meaning we need the item ID passed down through props
  }

  handleExitButtonClick() {
    this.props.toggleCreateReviewModal();
  }

  handleCharRadioClick(event) {
    $(`#choice${event.target.name}`).text(`${event.target.name}: ${this.charsObject[event.target.name][event.target.value - 1]}`);
  }

  updateLengthDetails(event) {
    console.log(event.target.value.length);
    if (event.target.value.length < 50) {
      $('#ReviewBodyLengthDetails').text(`Minumum required characters left: ${50 - event.target.value.length}`);
    } else {
      $('#ReviewBodyLengthDetails').text('Minimum reached');
    }
  }

  renderCharsRadioButtons(name) {
    return (
      <>
        <div id={`choice${name}`}>{name}: None selected</div>
        {/* <RadioRowWrapper> */}
          <input type="radio" onClick={this.handleCharRadioClick} className={`Class-${this.props.productId}`} required="required" name={`${name}`} value="1" />
          <input type="radio" onClick={this.handleCharRadioClick} className={`Class-${this.props.productId}`} required="required" name={`${name}`} value="2" />
          <input type="radio" onClick={this.handleCharRadioClick} className={`Class-${this.props.productId}`} required="required" name={`${name}`} value="3" />
          <input type="radio" onClick={this.handleCharRadioClick} className={`Class-${this.props.productId}`} required="required" name={`${name}`} value="4" />
          <input type="radio" onClick={this.handleCharRadioClick} className={`Class-${this.props.productId}`} required="required" name={`${name}`} value="5" />
        {/* </RadioRowWrapper> */}
        {/* <CharWorstBestWrapper> */}
          <div>
            {this.charsObject[name][0]}
          </div>
          <div>
            {this.charsObject[name][4]}
          </div>
        {/* </CharWorstBestWrapper> */}
      </>
    );
  }

  logfiles(event) {
    // HARDCODING ONE IMAGE FILE FOR EACH
    // MUST SELECT ALL IMAGES AT ONCE FOR THIS TO WORK
    $('#UploadedImages').empty();
    let imgFiles = Object.keys(event.target.files);
    console.log('array', imgFiles.length);
    imgFiles.forEach(file => $('#UploadedImages').append('<img src=https://picsum.photos/40 />'));
    if (event.target.files.length >= 5) {
      console.log('should remove');
      $('input').remove('#ImgUpload');
    }
  }

  validateForm() {
    // if
    // overall rating stars has a value
    // recommend radio has a value
    // characteristics radios have values
    // review body has 50+ chars
    // nickname has value
    // email has value - and format - @ and dot
    // if any return false - return false
    // message: "You must enter the following" - array of messages based on what went false
    // else return true
  }

  handleStarIconClick() {
    const ratingWords = ["Poor", "Fair", "Average", "Good", "Best"];
    $('#InnerStars').width(`${event.target.id * 20}%`);
    $('#HiddenRatingInput').val(`${event.target.id}`);
    $('#RatingText').text(`Overall Rating:* ${ratingWords[event.target.id - 1]}`)
  }

  render() {
    var charsArray = Object.keys(this.props.metaInfo.characteristics);
    return (
      <>
        <CenteredDiv>
          <form id="create-new-review" method="post">
            <EachInputWrapper>
              <strong>
                <h4>Write Your Review</h4>
                <h5>About the {this.state.productName || ''}</h5>
              </strong>
            </EachInputWrapper>
            <FloatLeft>
            <EachInputWrapper id="overall-rating">
              <p id="RatingText">Overall Rating:*</p>
              <HiddenRating type="text" id="HiddenRatingInput" />
            <StarsOuter>
                <FontAwesomeIcon icon={faStar} id="1" onClick={this.handleStarIconClick} />
                <FontAwesomeIcon icon={faStar} id="2" onClick={this.handleStarIconClick} />
                <FontAwesomeIcon icon={faStar} id="3" onClick={this.handleStarIconClick} />
                <FontAwesomeIcon icon={faStar} id="4" onClick={this.handleStarIconClick} />
                <FontAwesomeIcon icon={faStar} id="5" onClick={this.handleStarIconClick} />
                <StarsInner id="InnerStars">
                  <FontAwesomeIcon icon={solidStar} id="5" onClick={this.handleStarIconClick} />
                  <FontAwesomeIcon icon={solidStar} id="5" onClick={this.handleStarIconClick} />
                  <FontAwesomeIcon icon={solidStar} id="5" onClick={this.handleStarIconClick} />
                  <FontAwesomeIcon icon={solidStar} id="5" onClick={this.handleStarIconClick} />
                  <FontAwesomeIcon icon={solidStar} id="5" onClick={this.handleStarIconClick} />
                </StarsInner>
              </StarsOuter>
            </EachInputWrapper>
            <EachInputWrapper id="recommend">
              Do you recommend this product?*
            <input type="radio" className="RecommendRadio" id="YesRecommend" required="required" name="RecommendOption" value="Yes" />
              <label htmlFor="YesRecommend">Yes</label>
              <input type="radio" className="RecommendRadio" id="NoRecommend" name="RecommendOption" value="No" />
              <label htmlFor="NoRecommend">No</label>
            </EachInputWrapper>
            <EachInputWrapper id="ReviewSummary">
              Review summary:
            <textarea id="ReviewSummaryText" maxLength="60" type="text" placeholder="Example: Best purchase ever!" />
            </EachInputWrapper>

            <EachInputWrapper id="ReviewBody">
              Review body:*
            <textarea id="ReviewBodyText" onKeyUp={this.updateLengthDetails} required="required" minLength="50" maxLength="1000" type="text" placeholder="Why did you like the product or not?" />
              <div id="ReviewBodyLengthDetails">Minimum required characters left: 50</div>
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
            </FloatLeft>


            <FloatRight>
            <EachInputWrapper id="characteristics">
              Please rate the product's characteristics*
            {/* <CharsRadioWrapper> */}
                {charsArray.map(char => {
                  return this.renderCharsRadioButtons(char, 'low', 'high');
                })}
              {/* </CharsRadioWrapper> */}
            </EachInputWrapper>
            <EachInputWrapper id="UploadYourPhotos">
              Upload your photos:
            <input type="file" onChange={this.logfiles} id="ImgUpload" multiple name="img[]" accept="image/*" />
              <div id="UploadedImages"></div>
            </EachInputWrapper>
            </FloatRight>



          <SubmitWrapper>
            <button type="submit" onClick={this.validateForm}>Submit Review</button>
          </SubmitWrapper>
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
