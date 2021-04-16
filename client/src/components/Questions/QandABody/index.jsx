import React from 'react';
import ABody from './ABody';
import QBody from './QBody';

class QandAHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  render() {
    return (
      <section className="QA-Body">
        <QBody />
        <ABody />
        <span className="Load-More">
          Load More Answers
        </span>
      </section>
    );
  }
}

export default QandAHeader;
