import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import config from '../../../../../config';

const TileDiv = styled.div`
  background-color: orange;
  margin: 5px;
  padding: 5px;
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
    const recommendation = this.props.review.recommend ? 'I recommend this product' : '';
    const response = this.props.review.response ? `Response: ${this.props.review.response}` : '';
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
          {this.props.review.date}
        </p>
        <h3>{this.props.review.summary}</h3>
        <p>{this.props.review.body}</p>
        <p>{recommendation}</p>
        <p>{response}</p>
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
