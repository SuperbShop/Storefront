import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import $ from 'jquery';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Modal from './Modal';

const TileContainer = styled.div`
  padding: 5px;
  border-top: 1px solid grey;
  min-height: 280px;
  max-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  `;

const StarsAuthorDateWrapper = styled.div`
  height: 15%;
  display: flex;
  justify-content: space-between;
  `;

const AuthorDateWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  `;

const SummaryWrapper = styled.div`
  height: 15%
  font-size: 50px;
  font-weight: bold;
  `;

const PhotosWrapper = styled.div`
height: 20%;
`;

const BodyWrapper = styled.div`
display: flex;
height: 20%;
`;

const RecommendWrapper = styled.div`
height: 10%;
`;

const ResponseWrapper = styled.div`
height: 15%;
display: flex;
align-items: center;
`;

const HelpfulReportWrapper = styled.div`
height: 10%;
`;

const ResponseTag = styled.div`
  line-height: 2;
  background-color: lightgrey;
  `;

const ThumbnailImage = styled.img`
  box-shadow: 0 5px 10px 2px rgba(195,192,192,.5);
  cursor: pointer;
  height: 40px;
  margin: 5px;
  border: 1px solid grey;
  `;

const FullsizeImage = styled.img`
  height: 85%;
  box-shadow: 0 5px 10px 2px rgba(195,192,192,.5);
  border: 1px solid grey;
  cursor: pointer;
  `;

const ImageModalDiv = styled.div`
  position: fixed;
  background-color: transparent;
  left: 0;
  right: 0;
  top: 10%;
  margin: 0 auto;
  width: 90%;
  height: 70%;
  text-align:center;
  z-index: 2;
  `;

const PageBlockerModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.6;
  background-color: rgba(128,128,128,0.5);
  `;

const StarsOuter = styled.div`
  color: rgb(128, 128, 128);
  display: inline-block;
  position: relative;
  overflow-x: hidden;
  `;

const TileButton = styled.button`
  color: #004c9e;
  font-weight: 700;
  border: none;
  background-color: white;
  text-decoration: underline;
  &:hover {
    color: red;
  };
  &:disabled {
    color: grey;
  };
  `;

const Summary = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;

const ShowMoreButtonStyle = {
  color: 'rgb(128, 128, 128)',
};

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreChars: false,
      modalPhoto: 'none',
    };
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleHelpfulClick = this.handleHelpfulClick.bind(this);
    this.handleReportClick = this.handleReportClick.bind(this);
    this.handleShowMoreClick = this.handleShowMoreClick.bind(this);
  }

  handleHelpfulClick(event) {
    const { review } = this.props;
    event.target.disabled = true;
    $.ajax({
      method: 'PUT',
      url: `api/reviews/${review.review_id}/helpful`,
      success: () => {
        this.setState({
          helpful: review.helpfulness + 1,
        });
      },
      error: (err) => console.error(err),
    });
  }

  handleReportClick(event) {
    const { review, fetchReviewsList } = this.props;
    event.target.disabled = true;
    $.ajax({
      method: 'PUT',
      url: `api/reviews/${review.review_id}/report`,
      success: () => {
        // GET request to retrieve the updated reviewsList
        fetchReviewsList();
      },
      error: (err) => console.error(err),
    });
  }

  handleImageClick(event) {
    const { modalPhoto } = this.state;
    if (modalPhoto !== event.target.src) {
      this.setState({
        modalPhoto: event.target.src,
      });
    } else {
      this.setState({
        modalPhoto: 'none',
      });
    }
  }

  handleShowMoreClick() {
    this.setState((prevState) => ({
      showMoreChars: !prevState.showMoreChars,
    }));
  }

  render() {
    const { review } = this.props;
    const {
      modalPhoto,
      showMoreChars,
      helpful,
    } = this.state;
    let recommendation;
    let bodyAndShowMore;
    let photoBody;

    if (review.recommend) {
      recommendation = (
        <div>
          <FontAwesomeIcon style={{ color: 'limegreen' }} icon={faCheck} />
          {' '}
          I recommend this product
        </div>
      );
    } else {
      recommendation = '';
    }

    if (review.body.length < 250) {
      bodyAndShowMore = (
        <div id="yo">
          {review.body}
        </div>
      );
    } else if (review.body.length > 250 && showMoreChars === false) {
      bodyAndShowMore = (
        <div>
          <div id="sup">
            {review.body.slice(0, 250)}
          </div>
          <div>
            <TileButton style={ShowMoreButtonStyle} type="button" onClick={this.handleShowMoreClick}>Show More</TileButton>
          </div>
        </div>
      );
    } else {
      bodyAndShowMore = (
        <div>
          <div id="sup">
            {review.body}
          </div>
          <div>
            <TileButton style={ShowMoreButtonStyle} type="button" onClick={this.handleShowMoreClick}>Show Less</TileButton>
          </div>
        </div>
      );
    }

    if (review.photos.length > 0) {
      photoBody = (
        <div>
          {review.photos.map((photo) => {
            if (modalPhoto === photo.url) {
              return (
                <React.Fragment key={photo.id}>
                  <PageBlockerModalDiv>
                    <Modal>
                      <ImageModalDiv>
                        <FullsizeImage
                          key={`${photo.id}Fullsize`}
                          src={photo.url}
                          onClick={this.handleImageClick}
                        />
                      </ImageModalDiv>
                    </Modal>
                  </PageBlockerModalDiv>
                </React.Fragment>
              );
            }
            return (
              <React.Fragment key={`${photo.id}Thumbnail`}>
                <ThumbnailImage
                  key={`${photo.id}Thumbnail`}
                  src={photo.url}
                  onClick={this.handleImageClick}
                />
              </React.Fragment>
            );
          })}
        </div>
      );
    }

    const StarsInner = styled.div`
      color: #EFC050;
      position: absolute;
      top: 0;
      left: 0;
      white-space: nowrap;
      overflow: hidden;
      width: ${review.rating * 20}%;
      `;

    const response = review.response ? (
      <div>
        <strong>Response from seller:</strong>
        {review.response}
      </div>
    ) : '';
    const helpfulValue = helpful || review.helpfulness;
    return (
      <TileContainer>
        <StarsAuthorDateWrapper>
          <StarsOuter>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <StarsInner>
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
            </StarsInner>
          </StarsOuter>
          <AuthorDateWrapper>
            {review.reviewer_name}
            ,
            {' '}
            {moment(review.date).format('LL')}

          </AuthorDateWrapper>

        </StarsAuthorDateWrapper>
        <SummaryWrapper>
          <Summary>{review.summary}</Summary>
        </SummaryWrapper>
        <PhotosWrapper>
          {photoBody}
        </PhotosWrapper>
        <BodyWrapper>
          {bodyAndShowMore}

        </BodyWrapper>
        <RecommendWrapper>
          {recommendation}

        </RecommendWrapper>
        <ResponseWrapper>

          <ResponseTag>{response}</ResponseTag>
        </ResponseWrapper>
        <HelpfulReportWrapper>
          Helpful?
          <TileButton
            type="button"
            onClick={this.handleHelpfulClick}
          >
            Yes
          </TileButton>
          (
          {helpfulValue}
          ) |
          <TileButton
            type="button"
            onClick={this.handleReportClick}
          >
            Report
          </TileButton>

        </HelpfulReportWrapper>
      </TileContainer>
    );
  }
}

ReviewTile.propTypes = {
  review: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.string,
    helpfulness: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.shape({})),
    rating: PropTypes.number,
    recommend: PropTypes.bool,
    response: PropTypes.string,
    review_id: PropTypes.number,
    reviewer_name: PropTypes.string,
    summary: PropTypes.string,
  }).isRequired,
  fetchReviewsList: PropTypes.func.isRequired,
};

export default ReviewTile;
