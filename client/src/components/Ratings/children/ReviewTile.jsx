import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
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

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // state of the helpful tile?
      // onClick for yes or no, changes this state up or down
    };
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

  render() {
    let recommendation;
    if (this.props.review.recommend) {
      recommendation = <p><FontAwesomeIcon icon={faCheck} /> I recommend this product</p>;
    } else {
      recommendation = '';
    }
    // const recommendation = this.props.review.recommend ? 'I recommend this product' : '';
    const response = this.props.review.response ? `Response from seller: ${this.props.review.response}` : '';
    const helpful = this.state.helpful || this.props.review.helpfulness;
    return (
      <TileDiv>
        <p>
          {this.props.review.rating}
          {' '}
          Stars
        </p>
        <p>
          {this.props.review.reviewer_name}
          ,
          {' '}
          {moment(this.props.review.date).format('LL')}
        </p>
        <h3>{this.props.review.summary}</h3>
        <p>{this.props.review.body}</p>
        {recommendation}
        <ResponseTag>{response}</ResponseTag>
        <p>
          Helpful?
          <button type="button" onClick={this.handleHelpfulClick.bind(this)}>Yes</button>
          ({helpful})
        </p>
      </TileDiv>
    );
  }
}

export default ReviewTile;
