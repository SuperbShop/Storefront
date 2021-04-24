import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import CharsRadioButtons from './CharsRadioButtons';

const CenteredDiv = styled.div`
  position: fixed;
  background-color: white;
  left: 0;
  right: 0;
  top: 5%;
  margin: 0 auto;
  width: 90%;
  height: 80%;
  text-align:center;
  box-shadow: 0 5px 10px 2px rgba(195,192,192,.5);
  z-index: 2000;

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

const HiddenRating = styled.input`
  display: none;
  `;

const StarsOuter = styled.div`
  color: rgb(128, 128, 128);
  display: inline-block;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  `;

const StarsInner = styled.div`
  color: gold;
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 50%
  `;

class CreateReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.charsObject = {
      Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
      Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
      Comfort: ['Uncomfortable', 'Slighty uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
      Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
      Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
      Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
    };
    this.handleExitButtonClick = this.handleExitButtonClick.bind(this);
    this.handleCharRadioClick = this.handleCharRadioClick.bind(this);
    this.updateLengthDetails = this.updateLengthDetails.bind(this);
    this.logfiles = this.logfiles.bind(this);
  }

  handleExitButtonClick() {
    this.props.toggleCreateReviewModal();
  }

  handleCharRadioClick(event) {
    $(`#choice${event.target.name}`).text(`${event.target.name}: ${this.charsObject[event.target.name][event.target.value - 1]}`);
  }

  handleStarIconClick() {
    const ratingWords = ['Poor', 'Fair', 'Average', 'Good', 'Best'];
    $('#InnerStars').width(`${event.target.id * 20}%`);
    $('#HiddenRatingInput').val(`${event.target.id}`);
    $('#RatingText').text(`Overall Rating:* ${ratingWords[event.target.id - 1]}`);
  }

  updateLengthDetails(event) {
    console.log(event.target.value.length);
    if (event.target.value.length < 50) {
      $('#ReviewBodyLengthDetails').text(`Minumum required characters left: ${50 - event.target.value.length}`);
    } else {
      $('#ReviewBodyLengthDetails').text('Minimum reached');
    }
  }

  logfiles(event) {
    // HARDCODING ONE IMAGE FILE FOR EACH
    // MUST SELECT ALL IMAGES AT ONCE FOR THIS TO WORK
    $('#UploadedImages').empty();
    const imgFiles = Object.keys(event.target.files);
    console.log('array', imgFiles.length);
    imgFiles.forEach(() => $('#UploadedImages').append('<img src=https://picsum.photos/40 />'));
    if (event.target.files.length >= 5) {
      console.log('should remove');
      $('input').remove('#ImgUpload');
    }
  }

  render() {
    console.log('name', this.props.productName);
    const charsArray = Object.keys(this.props.metaInfo.characteristics);
    return (
      <>
        <CenteredDiv>
          <form id="create-new-review" method="post">
            <EachInputWrapper>
              <strong>
                <h4>Write Your Review</h4>
                <h5>
                  About the {this.props.productName}
                </h5>
              </strong>
            </EachInputWrapper>
            <FloatLeft>
              <EachInputWrapper id="overall-rating">
                <p id="RatingText">Overall Rating:*</p>
                {/* maybe make this hidden rating a radio input
                 - that way it makes more sense that its required? */}
                <HiddenRating type="text" required="required" id="HiddenRatingInput" />
                <StarsOuter>
                  <FontAwesomeIcon icon={faStar} id="1" onClick={this.handleStarIconClick} />
                  <FontAwesomeIcon icon={faStar} id="2" onClick={this.handleStarIconClick} />
                  <FontAwesomeIcon icon={faStar} id="3" onClick={this.handleStarIconClick} />
                  <FontAwesomeIcon icon={faStar} id="4" onClick={this.handleStarIconClick} />
                  <FontAwesomeIcon icon={faStar} id="5" onClick={this.handleStarIconClick} />
                  <StarsInner id="InnerStars">
                    <FontAwesomeIcon icon={solidStar} id="1" onClick={this.handleStarIconClick} />
                    <FontAwesomeIcon icon={solidStar} id="2" onClick={this.handleStarIconClick} />
                    <FontAwesomeIcon icon={solidStar} id="3" onClick={this.handleStarIconClick} />
                    <FontAwesomeIcon icon={solidStar} id="4" onClick={this.handleStarIconClick} />
                    <FontAwesomeIcon icon={solidStar} id="5" onClick={this.handleStarIconClick} />
                  </StarsInner>
                </StarsOuter>
              </EachInputWrapper>
              <EachInputWrapper id="recommend">
                Do you recommend this product?*
                <label htmlFor="YesRecommend">Yes</label>
                <input type="radio" className="RecommendRadio" id="YesRecommend" required="required" name="RecommendOption" value="Yes" />
                <label htmlFor="NoRecommend">No</label>
                <input type="radio" className="RecommendRadio" id="NoRecommend" name="RecommendOption" value="No" />
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
                Please rate the product characteristics*
                {/* <CharsRadioWrapper> */}
                {charsArray.map((char) => (
                  <CharsRadioButtons
                    charsArray={charsArray}
                    charsObject={this.charsObject}
                    handleCharRadioClick={this.handleCharRadioClick}
                    key={char}
                    name={char}
                  />
                ))}
                {/* </CharsRadioWrapper> */}
              </EachInputWrapper>
              <EachInputWrapper id="UploadYourPhotos">
                Upload your photos:
                <input type="file" onChange={this.logfiles} id="ImgUpload" multiple name="img[]" accept="image/*" />
                <div id="UploadedImages" />
              </EachInputWrapper>
            </FloatRight>
            <SubmitWrapper>
              <button type="submit" onClick={this.validateForm}>Submit Review</button>
            </SubmitWrapper>
          </form>
          <ExitButtonWrapper>
            <button type="button" id="exitbutton" onClick={this.handleExitButtonClick}>X</button>
          </ExitButtonWrapper>
        </CenteredDiv>
      </>
    );
  }
}

export default CreateReview;
