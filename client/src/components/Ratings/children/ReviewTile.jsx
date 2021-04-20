import React from 'react';
import styled from 'styled-components';

const TileDiv = styled.div`
  display: grid;
  grid-template-areas:
    'a . b'
    'c c c'
    'd d d'
    'e . .'
    'f f f'
    'g . .';
  background-color: orange;
  margin: 5px;
  padding: 5px;
  `;

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // state idk
    };
  }

  render() {
    console.log(this.props);
    const recommendation = this.props.review.recommend ? 'I recommend this product' : '';
    const response = this.props.review.response ? 'Response: ' + this.props.review.response : '';
    return (
      <TileDiv>
        <p>{this.props.review.rating} Stars</p>
        <p>{this.props.review.reviewer_name}, {this.props.review.date}</p>
        <strong>{this.props.review.summary}</strong>
        <p>{recommendation}</p>
        <p>{this.props.review.body}</p>
        <p>{response}</p>
        <p>
          Helpful?
          <button type="button">Yes</button>
          ({this.props.review.helpfulness})
          <button type="button">No</button>
        </p>
      </TileDiv>
    );
  }
}

export default ReviewTile;
