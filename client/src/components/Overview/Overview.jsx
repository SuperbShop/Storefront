import React from 'react';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    axios.get(`/products/${this.props.product}`)
      .then((data) => console.log(data.data))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <p>Overview</p>
    );
  }
}

export default Overview;
