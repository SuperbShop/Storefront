import React from 'react';
import QOptions from './QOptions';

class QBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 'text',
    };
  }

  render() {
    return (
      <div className="Q-Body">
        <span>
          <strong>Q: </strong>
        </span>
        <span>
          <strong>Who what which when where why?</strong>
        </span>
        <div className="options-upper">
          <div className="QOptions">
            <QOptions />
          </div>
        </div>
      </div>
    );
  }
}

export default QBody;
