import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import config from '../../../../../../config';
import Modal from './Modal';

const TileDiv = styled.div`
  padding: 5px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  min-height: 280px;
  max-height: 280px;
  `;

const ResponseTag = styled.p`
  background-color: lightgrey;
  `;

const ThumbnailImage = styled.img`
  height: 40px;
  margin: 5px;
  `;

const FullsizeImage = styled.img`
  height: 85%;
  `;

const ImageModalDiv = styled.div`
  position: absolute;
  background-color: lightgrey;
  left: 0;
  right: 0;
  top: 30%;
  bottom: 0;
  margin: auto;
  width: 90%;
  height: 70%;
  text-align:center;
  z-index: 2;
  box-shadow: 0 5px 10px 2px rgba(195,192,192,.5);
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

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      modalPhoto: 'none',
    };
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleHelpfulClick = this.handleHelpfulClick.bind(this);
  }

  handleHelpfulClick(event) {
    event.target.disabled = true;
    $.ajax({
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews/${this.props.review.review_id}/helpful`,
      headers: {
        Authorization: config.API_KEY,
      },
      success: () => {
        this.setState({
          helpful: this.props.review.helpfulness + 1,
        });
      },
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

  render() {
    let recommendation;
    if (this.props.review.recommend) {
      recommendation = (
        <p>
          <FontAwesomeIcon icon={faCheck} />
          {' '}
          I recommend this product
        </p>
      );
    } else {
      recommendation = '';
    }
    /// ////////////////////////////////////////////////////
    // NEED TO REWORK THIS FOR SHOW MORE BUTTON ///////////
    /// ////////////////////////////////////////////////////
    // let body;
    // if (this.props.review.photos.length > 0) {
    //   body = (
    //     <div>
    //       <div>
    //         {this.props.review.photos.map((photo) => <ThumbnailImage onClick={this.handleImageClick} key={photo.id} src={photo.url} />)}
    //       </div>
    //       <div>
    //         {this.state.showMore ? this.props.review.body : this.props.review.body.slice(0, 250)}
    //       </div>
    //     </div>
    //   );
    // } else {
    //   body = <p>{this.state.showMore ? this.props.review.body : this.props.review.body.slice(0, 250)}</p>;
    // }

    let body = (
      <div>
        {this.props.review.body}
      </div>
    );
    if (this.props.review.photos.length > 0) {
      body = (
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
          <div>
            {this.props.review.body}
          </div>
        </div>
      );
    }

    // body
    // if there are photos
    // body + photos
    // if you click a photo
    // body + photos + modal around one photo

    /// ///////////////////////////////////////////////////
    /// ///////////////////////////////////////////////////
    const response = this.props.review.response ? `Response from seller: ${this.props.review.response}` : '';
    const helpful = this.state.helpful || this.props.review.helpfulness;
    return (
      <TileDiv>
        <p>
          {this.props.review.rating}
          {' '}
          Stars
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </p>
        <p>
          {this.props.review.reviewer_name}
          ,
          {' '}
          {moment(this.props.review.date).format('LL')}
        </p>
        <h3>{this.props.review.summary}</h3>
        {body}
        {recommendation}
        <ResponseTag>{response}</ResponseTag>
        <p>
          Helpful?
          <button type="button" onClick={this.handleHelpfulClick}>Yes</button>
          (
          {helpful}
          )
        </p>
      </TileDiv>
    );
  }
}

export default ReviewTile;
