import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import config from '../../../../../config';

const TileDiv = styled.div`
  background-color: orange;
  margin: 5px;
  padding: 5px;
  min-height: 260px;
  max-height: 260px;
  `;

const ResponseTag = styled.p`
  background-color: grey;
  `;

const ThumbnailImage = styled.img`
  height: 40px;
  `;

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
    this.logImageUrl = this.logImageUrl.bind(this);
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

  logImageUrl(event) {
    console.log('id of image clicked:', event.target.src);
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
    ///////////////////////////////////////////////////////
    // NEED TO REWORK THIS FOR SHOW MORE BUTTON ///////////
    ///////////////////////////////////////////////////////
    let body;
    if (this.props.review.photos.length > 0) {
      body = (
        <div>
          <div>
            {this.props.review.photos.map((photo) => <ThumbnailImage onClick={this.logImageUrl} key={photo.id} src={photo.url} />)}
          </div>
          <div>
            {this.state.showMore ? this.props.review.body : this.props.review.body.slice(0, 250)}
          </div>
        </div>
      );
    } else {
      body = <p>{this.state.showMore ? this.props.review.body : this.props.review.body.slice(0, 250)}</p>;
    }
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
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
        <div>{body}</div>
        {recommendation}
        <ResponseTag>{response}</ResponseTag>
        <p>
          Helpful?
          <button type="button" onClick={this.handleHelpfulClick}>Yes</button>
          ({helpful})
        </p>
      </TileDiv>
    );
  }
}

export default ReviewTile;
