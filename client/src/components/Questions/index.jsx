import React from 'react';
import QandAHeader from './QandAHeader';
import QandABody from './QandABody';
import QandAFooter from './QandAFooter';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: true,
    };
  }

  render() {
    return (
      <div className="QuestionsAndAnswers">
        <QandAHeader />
        <QandABody />
        <QandAFooter />
      </div>
    );
  }
}

export default Questions;
