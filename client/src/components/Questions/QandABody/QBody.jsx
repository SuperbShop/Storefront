import React from 'react';
import $ from 'jquery';
import QOptions from './QOptions';
import ABody from './ABody';

class QBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 'default',
      numDisplayed: 2,
      reported: false,
    };
    this.onCLickDisplay = this.onClickDisplay.bind(this);
    this.onClickReport = this.onClickReport.bind(this);
  }

  componentDidMount() {
    const { question } = this.props;
    this.setState({
      question,
    });
    console.log(this.props);
  }

  report() {
    this.setState({
      reported: true,
    });
    const $this = $(this);
    console.log($this);
    $this.toggleClass('reported');
    if ($this.hasClass('reported')) {
      $this.test('Report');
    } else {
      $this.text('Reported');
    }
    console.log(this.state.reported);
  }

  onClickDisplay() {
    this.displayMore();
  }

  onClickReport() {
    this.report();
    alert('REPORTED');
  }

  displayMore() {
    this.setState({
      numDisplayed: this.state.numDisplayed + 2,
    });
  }

  render() {
    const { question } = this.props;
    const { question_body } = question;
    const { answers } = question;
    const { question_helpfulness } = question;
    const { numDisplayed } = this.state;
    const ansArr = Object.values(answers);
    const ansDisplayed = ansArr.slice(0, numDisplayed);
    const lengthTest = ansDisplayed.length >= 2 && ansArr.length > ansDisplayed.length;
    return (
      <div className="Q-Body">
        <span>
          <strong>Q: </strong>
        </span>
        <span>
          <strong>{question_body}</strong>
        </span>
        <div className="options-upper">
          <div className="QOptions">
            <QOptions helpfulness={question_helpfulness} />
          </div>
        </div>
        { ansDisplayed.map((answer, index) => (
          <ABody answer={answer} onClickReport={this.onClickReport} key={`answer ${index}`} />
        ))}
        { lengthTest
          ? <button type="submit" onClick={this.onCLickDisplay}>Load More Answers</button>
          : <span>No More Answers to Display</span>}

      </div>
    );
  }
}

export default QBody;
