import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import config from '../../../../../../config';
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

const ResponseTag = styled.p`
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
  color: #007BFF;
  border: none;
  background-color: white;
  text-decoration: underline;
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
    event.target.disabled = true;
    $.ajax({
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews/${this.props.review.review_id}/helpful`,
      headers: {
        Authorization: config.TOKEN,
      },
      success: () => {
        this.setState({
          helpful: this.props.review.helpfulness + 1,
        });
      },
      error: (err) => console.error(err),
    });
  }

  handleReportClick(event) {
    event.target.disabled = true;
    $.ajax({
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews/${this.props.review.review_id}/report`,
      headers: {
        Authorization: config.TOKEN,
      },
      success: (res) => console.log(res),
      error: (err) => console.error(err),
    });
  }

  handleImageClick(event) {
    console.log('id of image clicked:', event.target.src);
    if (this.state.modalPhoto !== event.target.src) {
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
    this.setState({
      showMoreChars: !this.state.showMoreChars,
    });
  }

  render() {
    let recommendation;
    let bodyAndShowMore;
    let photoBody;

    if (this.props.review.recommend) {
      recommendation = (
        <p>
          <FontAwesomeIcon style={{color:"limegreen"}} icon={faCheck} />
          {' '}
          I recommend this product
        </p>
      );
    } else {
      recommendation = '';
    }

    if (this.props.review.body.length < 250) {
      bodyAndShowMore = (
        <div id="yo">
          {this.props.review.body}
        </div>
      );
    } else if (this.props.review.body.length > 250 && this.state.showMoreChars === false) {
      bodyAndShowMore = (
        <div>
          <div id="sup">
            {this.props.review.body.slice(0, 250)}
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
            {this.props.review.body}
          </div>
          <div>
            <TileButton style={ShowMoreButtonStyle} type="button" onClick={this.handleShowMoreClick}>Show Less</TileButton>
          </div>
        </div>
      );
    }

    if (this.props.review.photos.length > 0) {
      photoBody = (
        <div>
          {this.props.review.photos.map((photo) => {
            if (this.state.modalPhoto === photo.url) {
              return (
                <PageBlockerModalDiv>
                  <Modal>
                    <ImageModalDiv>
                      <FullsizeImage
                        key={photo.id}
                        src={photo.url}
                        onClick={this.handleImageClick}
                      />
                    </ImageModalDiv>
                  </Modal>
                </PageBlockerModalDiv>
              );
            }
            return (
              <ThumbnailImage
                key={photo.id}
                src={photo.url}
                onClick={this.handleImageClick}
              />
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
      width: ${this.props.review.rating * 20}%;
      `;

    const response = this.props.review.response ? <div><strong>Response from seller:</strong>{this.props.review.response}</div> : '';
    const helpful = this.state.helpful || this.props.review.helpfulness;
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
            {this.props.review.reviewer_name}
          ,
          {' '}
            {moment(this.props.review.date).format('LL')}

          </AuthorDateWrapper>

        </StarsAuthorDateWrapper>
        <SummaryWrapper>
          <h5>{this.props.review.summary}</h5>
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
          <TileButton type="button" onClick={this.handleHelpfulClick}>Yes</TileButton>
          (
          {helpful}
          ) |
          <TileButton type="button" onClick={this.handleReportClick}>Report</TileButton>

        </HelpfulReportWrapper>
      </TileContainer>
    );
  }
}

export default ReviewTile;
