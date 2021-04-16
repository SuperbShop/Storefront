import React from 'react';
import Breakdown from './Breakdown';

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // property: true,
    };
  }

  render() {
    return (
      <div>
        Ratings
        <Breakdown />
      </div>
    );
  }
}

export default Ratings;
