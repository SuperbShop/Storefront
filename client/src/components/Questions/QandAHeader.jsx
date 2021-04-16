import React from 'react';

class QandAHeader extends React.Component {
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
      <section className="q-and-a-header">
        <h2>
          Questions &amp; Answers
        </h2>
        <input className="question-input" placeholder="Have A Question? Search for Answers" />
      </section>
    );
  }
}

export default QandAHeader;
