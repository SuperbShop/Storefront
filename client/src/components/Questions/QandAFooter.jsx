import React from 'react';

class QandAFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: true,
    };
  }
  // onChange() {

  // }
  // clickHandler(e) {
  //   const { value } = e.target;

  // }

  render() {
    return (

      <div className="QA Footer Question-Buttons">
        <button type="submit">More Answered Questions</button>
        <button type="submit">Add A Question</button>
      </div>
    );
  }
}

export default QandAFooter;
