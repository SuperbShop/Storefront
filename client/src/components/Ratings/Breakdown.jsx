import React from 'react';

class Breakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // idk yet
    };
  }

  componentDidMount() {
    // send GET to /reviews?product_id=props.product
  }

  render() {
    return (
      <div id="breakdown">This is the ratings breakdown component</div>
    );
  }
}

export default Breakdown;
