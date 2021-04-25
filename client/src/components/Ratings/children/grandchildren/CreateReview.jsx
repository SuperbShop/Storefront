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
  z-index: 2000;
  font-size: 14px;

  `;
const TitleWrapper = styled.div`
margin-left: 2%;
margin-right: 2%;

  height: 20%;
  display: flex;
  justify-content: flex-start;
  `;

const FloatLeft = styled.div`
    position: absolute;
    width: 48%;
    left: 0;
    display: flex;
    margin-left: 2%;
    flex-direction: column;
    align-items: flex-start;
    height: 80%;
    `;
const FloatRight = styled.div`
    margin-right: 2%;
    width: 48%;
    height: 80%;
    position:absolute;
    right: 0;
    `;

const RatingAndRecommendWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20%;
  width: 100%;
  `;

const RecommendWrapper = styled.div`
  width: 100%;
  float: right;
  `;

const ReviewSummaryWrapper = styled.div`
  display: flex;
  flex-direction:
  justify-content: space-between;
  padding-left: 5%;
  height: 10%;
  width: 100%;
  `;

const SummaryTextInput = styled.input`
  border: 1px solid grey;
  height: 40%;
  width: 70%;
  margin-right: 10%;
  `;

const ReviewBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 5%;
  width: 100%;
  height: 40%;
  `;

const ReviewBodyTextArea = styled.textarea`
  height: 100%;
  margin-right: 5%;
  margin-top: 4%;
  margin-bottom: 4%;
  `;

const ReviewBodyTitle = styled.div`
  display: flex;
  margin-right: 5%;
  justify-content: flex-start;
  height: 15%;
  `;

const ReviewBodyCharCount = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 5%;
  padding-bottom: 5%;
  font-size: 12px;
  height: 5%;
  `;

const NicknameAndEmailWrapper = styled.div`
  padding-right: 5%;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction:column;
`;

const NicknameAndEmailTitle = styled.div`
display: flex;
justify-content: flex-start;
`;

const NicknameWrapper = styled.div`
display: flex;
flex-direction: column;
padding-left: 5%;
height: 50%;
  `;

const EmailWrapper = styled.div`
display: flex;
flex-direction: column;
padding-left: 5%;
height: 50%;
`;

const StyledInput = styled.input`
  width: 60%;
  margin-left: 40%;
  `;

const PrivacyWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
  `;

const CharacteristicsWrapper = styled.div`
display: flex;
flex-direction: column;
height: 80%;
`;

const CharsRadioButtonWrapper = styled.div`
display: flex;
height: 13%;
margin-top: 1%;
`;

const PhotoUploadWrapper = styled.div`
  display: flex;
  height: 20%;
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  `;

const PhotoUploadUpper = styled.div`
  display: flex;
  height: 30%;
  `;

const PhotoUploadLower = styled.div`
  display: flex;
  height: 40%;
  margin-top: 5%;
  margin-bottom: 5%;
  `;

const ExitButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  `;

const SubmitWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10%;
  `;

const SubmitButton = styled.button`
  cursor: pointer;
  background-color: white;
  border: 1px solid #838383;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px 0px;
  &:hover {
    background-color: black;
    color: white;
  };
  &:focus {
    outline-color: none;
  }
  `;

const HiddenRating = styled.input`
  display: none;
  `;

const RatingWrapper = styled.div`
  border: 1px solid grey;
  width: 200px;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  `;

const StarsOuter = styled.div`
  border: 1px solid blue;
  color: rgb(128, 128, 128);
  display: inline-block;
  position: relative;
  overflow-x: hidden;
  width: 100px;
  height: 25px;
  `;

const StarsInner = styled.div`
  border: 1px solid red;
  color: gold;
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow-x hidden;
  width: 0;
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
    console.log('width', $('#InnerStars').width());
    $('#HiddenRatingInput').val(`${event.target.id}`);
    $('#RatingText').text(`Overall Rating:* ${ratingWords[event.target.id - 1]}`);
  }

  updateLengthDetails(event) {
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
    imgFiles.forEach(() => $('#UploadedImages').append('<img style="padding: 5px;" src=https://picsum.photos/40 />'));
    if (event.target.files.length >= 5) {
      $('input').remove('#ImgUpload');
    }
  }

  render() {
    const charsArray = Object.keys(this.props.metaInfo.characteristics);
    return (
      <>
        <CenteredDiv>
          <form id="create-new-review" method="post">
            <TitleWrapper>
              <strong>
                <h4>
                  Write your review about the
                  {this.props.productName}
                </h4>
              </strong>
            </TitleWrapper>
            <FloatLeft>
              <RatingAndRecommendWrapper>
                  <HiddenRating type="text" required="required" id="HiddenRatingInput" />
                <RatingWrapper id="overall-rating">
                  <div id="RatingText">Overall Rating:*</div>
                  {/* maybe make this hidden rating a radio input
                 - that way it makes more sense that its required? */}
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
                </RatingWrapper>
                <RecommendWrapper id="recommend">
                  Do you recommend this product?*
                  <label htmlFor="YesRecommend">Yes</label>
                  <input type="radio" className="RecommendRadio" id="YesRecommend" required="required" name="RecommendOption" value="Yes" />
                  <label htmlFor="NoRecommend">No</label>
                  <input type="radio" className="RecommendRadio" id="NoRecommend" name="RecommendOption" value="No" />
                </RecommendWrapper>
              </RatingAndRecommendWrapper>
              <ReviewSummaryWrapper id="ReviewSummary">
                <div>
                  Review summary:
                </div>
                <SummaryTextInput id="ReviewSummaryText" maxLength="60" type="text" placeholder="Example: Best purchase ever!" />
              </ReviewSummaryWrapper>

              <ReviewBodyWrapper id="ReviewBody">
                <ReviewBodyTitle>
                  Review body:*
                </ReviewBodyTitle>
                <ReviewBodyTextArea id="ReviewBodyText" onKeyUp={this.updateLengthDetails} required="required" minLength="50" maxLength="1000" type="text" placeholder="Why did you like the product or not?" />
                <ReviewBodyCharCount id="ReviewBodyLengthDetails">Minimum required characters left: 50</ReviewBodyCharCount>
              </ReviewBodyWrapper>

              <NicknameAndEmailWrapper>
                <NicknameWrapper id="WhatIsYourNickname">
                  <NicknameAndEmailTitle>
                    What is your nickname?*

                  </NicknameAndEmailTitle>
                  <StyledInput id="WhatIsYourNicknameText" required="required" maxLength="60" type="text" placeholder="Example: jackson11!" />
                  <PrivacyWrapper>
                    For privacy reasons, do not use your full name or email address
                  </PrivacyWrapper>
                </NicknameWrapper>

                <EmailWrapper id="WhatIsYourEmail">
                  <NicknameAndEmailTitle>
                    What is your email?*

                  </NicknameAndEmailTitle>
                  <StyledInput id="WhatIsYourEmailText" required="required" maxLength="60" type="text" placeholder="Example: jackson11@email.com" />
                  <PrivacyWrapper>
                    For authentication reasons, you will not be emailed
                  </PrivacyWrapper>
                </EmailWrapper>
              </NicknameAndEmailWrapper>
            </FloatLeft>

            <FloatRight>
              <CharacteristicsWrapper id="characteristics">
                Please rate the product characteristics*
                {/* <CharsRadioWrapper> */}
                {charsArray.map((char) => (
                  <CharsRadioButtonWrapper key={char}>
                    <CharsRadioButtons
                      charsArray={charsArray}
                      charsObject={this.charsObject}
                      handleCharRadioClick={this.handleCharRadioClick}
                      key={char}
                      name={char}
                    />
                  </CharsRadioButtonWrapper>
                ))}
                {/* </CharsRadioWrapper> */}
              </CharacteristicsWrapper>
              <PhotoUploadWrapper id="UploadYourPhotos">
                <PhotoUploadUpper>
                  Upload photos:
                  <input type="file" onChange={this.logfiles} id="ImgUpload" multiple name="img[]" accept="image/*" />
                </PhotoUploadUpper>

                <PhotoUploadLower id="UploadedImages" />
              </PhotoUploadWrapper>
            </FloatRight>
            <SubmitWrapper>
              <SubmitButton type="submit" onClick={this.validateForm}>SUBMIT REVIEW</SubmitButton>
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
