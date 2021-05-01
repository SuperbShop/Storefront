import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  align-items: space-between;
  height: 20%;
  width: 100%;
  `;

const RecommendWrapper = styled.div`
  margin-right: 5%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  `;

const ReviewSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5%;
  height: 10%;
  width: 100%;
  `;

const ReviewSummaryPrompt = styled.div`
  align-self: flex-start;
  `;

const SummaryTextInput = styled.input`
  border: 1px solid grey;
  height: 40%;
  width: 70%;
  margin-right: 5%;
  align-self: flex-end;
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
  font-size: 10px;
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

const StyledNicknameEmailInput = styled.input`
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
  right: 5px;
  top: 0;
  cursor: pointer;
  &:hover {
    color: red;
  }
  `;

const SubmitWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10%;
  `;

const SubmitButton = styled.button`
  cursor: pointer;
  width: 250px;
  padding: 15px;
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
  margin-left: 5%;
  width: 200px;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  `;

const StarsOuter = styled.div`
  color: rgb(128, 128, 128);
  display: inline-block;
  position: relative;
  height: 25px;
  `;

const StarsInner = styled.div`
  color: #EFC050;
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow-x hidden;
  width: 0;
  `;

const updateBodyLengthDetails = (event) => {
  if (event.target.value.length < 50) {
    document.getElementById('ReviewBodyLengthDetails').innerText = `Minumum required characters left: ${50 - event.target.value.length}`;
  } else {
    document.getElementById('ReviewBodyLengthDetails').innerText = 'Minimum reached';
  }
};

class CreateReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      summary: '',
      body: '',
      recommend: '',
      name: '',
      email: '',
      photos: [],
      characteristics: {},
    };

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
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStarIconClick = this.handleStarIconClick.bind(this);
    this.handleRecommendChange = this.handleRecommendChange.bind(this);
  }

  handleExitButtonClick() {
    const { toggleCreateReviewModal } = this.props;
    toggleCreateReviewModal();
  }

  handleStarIconClick(event) {
    const ratingWords = ['Poor', 'Fair', 'Average', 'Good', 'Best'];
    if (ratingWords[event.target.id - 1] === undefined) {
      return;
    }
    this.setState({
      rating: Number(event.target.id),
    });
    document.getElementById('InnerStars').style.width = `${event.target.id * 20}%`;
    document.getElementById('HiddenRatingInput').value = event.target.id;
    document.getElementById('RatingText').innerText = `Overall Rating:* ${ratingWords[event.target.id - 1]}`;
  }

  handleImageUpload() {
    const imageThumbnails = document.getElementById('UploadedImages');
    while (imageThumbnails.firstChild) {
      imageThumbnails.removeChild(imageThumbnails.firstChild);
    }
    const { files } = document.getElementById('ImgUpload');
    for (let i = 0; i < files.length; i += 1) {
      const img = new Image();
      img.src = URL.createObjectURL(files[i]);
      img.title = files[i].name;
      document.getElementById('UploadedImages').appendChild(img);
      this.setState((prevState) => ({
        photos: [...prevState.photos, img.src],
      }));
    }
  }

  handleCharRadioClick(event) {
    const { metaInfo } = this.props;
    const charId = metaInfo.characteristics[event.target.name].id;
    document.getElementById(`choice${event.target.name}`).innerText = `${event.target.name}: ${this.charsObject[event.target.name][event.target.value - 1]}`;
    this.setState((prevState) => ({
      characteristics: {
        ...prevState.characteristics,
        [charId]: Number(event.target.value),
      },
    }));
  }

  handleRecommendChange(event) {
    this.setState({
      recommend: (event.target.value === 'true'),
    });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    const {
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics,
    } = this.state;
    const { metaInfo, fetchReviewsList } = this.props;
    const data = {
      product_id: Number(metaInfo.product_id),
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics,
    };
    $.ajax({
      url: '/api/reviews',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: () => {
        this.handleExitButtonClick();
        fetchReviewsList();
      },
      error: () => {
        console.error('Could not process review submission');
      },
    });
  }

  render() {
    const { metaInfo, productName } = this.props;
    const {
      rating,
      summary,
      body,
      name,
      email,
    } = this.state;
    const charsArray = Object.keys(metaInfo.characteristics);
    return (
      <>
        <CenteredDiv>
          <form method="post" action="/api/reviews">
            <TitleWrapper>
              <strong>
                <h4>
                  Write your review about the
                  {' '}
                  {productName}
                </h4>
              </strong>
            </TitleWrapper>
            <FloatLeft>
              <RatingAndRecommendWrapper>
                <HiddenRating name="rating" value={rating} onChange={this.handleInputChange} type="text" required="required" id="HiddenRatingInput" />
                <RatingWrapper id="overall-rating">
                  <div id="RatingText">Overall Rating:*</div>
                  <StarsWrapper>
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
                  </StarsWrapper>
                </RatingWrapper>
                <RecommendWrapper id="recommend">
                  Do you recommend this product?*
                  <div>
                    <label htmlFor="true">Yes</label>
                    <input type="radio" className="RecommendRadio" onChange={this.handleRecommendChange} id="true" required="required" name="recommend" value="true" />
                    <label htmlFor="false">No</label>
                    <input type="radio" className="RecommendRadio" onChange={this.handleRecommendChange} id="false" name="recommend" value="false" />
                  </div>
                </RecommendWrapper>
              </RatingAndRecommendWrapper>
              <ReviewSummaryWrapper id="ReviewSummary">
                <ReviewSummaryPrompt>
                  Review summary:
                </ReviewSummaryPrompt>
                <SummaryTextInput name="summary" value={summary} onChange={this.handleInputChange} id="ReviewSummaryText" maxLength="60" type="text" placeholder="Example: Best purchase ever!" />
              </ReviewSummaryWrapper>

              <ReviewBodyWrapper id="ReviewBody">
                <ReviewBodyTitle>
                  Review body:*
                </ReviewBodyTitle>
                <ReviewBodyTextArea name="body" value={body} onChange={this.handleInputChange} id="ReviewBodyText" onKeyUp={updateBodyLengthDetails} required="required" minLength="50" maxLength="1000" type="text" placeholder="Why did you like the product or not?" />
                <ReviewBodyCharCount id="ReviewBodyLengthDetails">Minimum required characters left: 50</ReviewBodyCharCount>
              </ReviewBodyWrapper>

              <NicknameAndEmailWrapper>
                <NicknameWrapper id="WhatIsYourNickname">
                  <NicknameAndEmailTitle>
                    What is your nickname?*
                  </NicknameAndEmailTitle>
                  <StyledNicknameEmailInput name="name" value={name} onChange={this.handleInputChange} id="WhatIsYourNicknameText" required="required" maxLength="60" type="text" placeholder="Example: jackson11!" />
                  <PrivacyWrapper>
                    For privacy reasons, do not use your full name or email address
                  </PrivacyWrapper>
                </NicknameWrapper>
                <EmailWrapper id="WhatIsYourEmail">
                  <NicknameAndEmailTitle>
                    What is your email?*
                  </NicknameAndEmailTitle>
                  <StyledNicknameEmailInput name="email" value={email} onChange={this.handleInputChange} id="WhatIsYourEmailText" required="required" maxLength="60" type="text" placeholder="Example: jackson11@email.com" />
                  <PrivacyWrapper>
                    For authentication reasons, you will not be emailed
                  </PrivacyWrapper>
                </EmailWrapper>
              </NicknameAndEmailWrapper>
            </FloatLeft>
            <FloatRight>
              <CharacteristicsWrapper id="characteristics">
                Please rate the product characteristics*
                {charsArray.map((char) => (
                  <CharsRadioButtonWrapper key={char}>
                    <CharsRadioButtons
                      charsObject={this.charsObject}
                      handleCharRadioClick={this.handleCharRadioClick}
                      key={char}
                      name={char}
                    />
                  </CharsRadioButtonWrapper>
                ))}
              </CharacteristicsWrapper>
              <PhotoUploadWrapper id="UploadYourPhotos">
                <PhotoUploadUpper>
                  Upload photos:
                  <input type="file" onChange={this.handleImageUpload} id="ImgUpload" multiple name="img[]" accept="image/*" />
                </PhotoUploadUpper>
                <PhotoUploadLower id="UploadedImages" />
              </PhotoUploadWrapper>
            </FloatRight>
            <SubmitWrapper>
              <SubmitButton type="submit" onClick={this.handleSubmit}>SUBMIT REVIEW</SubmitButton>
            </SubmitWrapper>
          </form>
          <ExitButtonWrapper>
            <FontAwesomeIcon icon={faTimes} onClick={this.handleExitButtonClick} />
          </ExitButtonWrapper>
        </CenteredDiv>
      </>
    );
  }
}

CreateReview.propTypes = {
  productName: PropTypes.string.isRequired,
  metaInfo: PropTypes.shape({
    product_id: PropTypes.string,
    characteristics: PropTypes.shape({}),
    ratings: PropTypes.shape({}),
    recommended: PropTypes.shape({}),
  }).isRequired,
  toggleCreateReviewModal: PropTypes.func.isRequired,
  fetchReviewsList: PropTypes.func.isRequired,
};

export default CreateReview;
