import React from 'react';
import $ from 'jquery';
import config from '../../../../config';
import ReviewTile from './children/ReviewTile';
import CreateReview from './children/CreateReview';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // tiles: 2,
    };
  }

  componentDidMount() {
    console.log(this.props.productNum);
    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews?product_id=${this.props.productNum}`,
      headers: {
        Authorization: config.API_KEY,
      },
      success: (data) => {
        console.log('listdata', data.results);
        this.setState({
          list: data.results,
        });
      },
      error: (err) => console.log(err),
    });
  }

  render() {
    const reviews = this.state.list || [];
    return (
      <div id="tiles">
        <p>{reviews.length} reviews, sorted by relevance</p>
        {reviews.map(item => {
          return <ReviewTile key={item.review_id} review={item}/>
        })}
        <p>Hardcoded CreateReview</p>
        <CreateReview />
      </div>
    );
  }
}

export default ReviewsList;
