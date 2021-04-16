import React from 'react';
import AOptions from './AOptions';

class ABody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  // onChange() {

  // }
  // clickHandler(e) {
  //   const { value } = e.target;

  // }

  render() {
    return (
      <div className="A-Body">
        <span>
          <strong>A: </strong>
        </span>
        <span className="answer">
          <p>
            Icing macaroon bear claw jelly beans chocolate cake.
            Cookie oat cake chocolate halvah jelly cake cotton candy souflee topping.
            Jujubes topping cake gummies lemon drops
          </p>
        </span>
        <div className="a options">
          <AOptions />
        </div>
      </div>
    );
  }
}

export default ABody;
