import React from 'react';
import AOptions from './AOptions';

class ABody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersDisplayed: 2,
    };
  }

  displayMore () {
    this.setState({
      answersDisplayed: answersDisplayed + 2,
    });
  }

  render() {
    const { answer } = this.props;
    const { body } = answer;
    const { answerer_name } = answer;
    const { date } = answer;
    const { helpfulness } = answer;
    console.log(answer);
    return (
      <div className="A-Body">
        <span>
          <strong>A: </strong>
        </span>
        <span className="answer">
          <p>
            {body}
          </p>
        </span>
        <div className="a options">
          <AOptions
            onClickReport={this.props.onClickReport}
            answerer={answerer_name}
            date={date}
            helpfulness={helpfulness}
            displayMore={this.displayMore}
          />
          { answer.photos
            ? answer.photos.map((photo, index) => (
              <img src={answer.photos[index]} alt="description" width="50" height="50" key={`${photo}+${index}`}></img>
            ))
            : <p>no photos</p>}
        </div>
      </div>
    );
  }
}

export default ABody;
