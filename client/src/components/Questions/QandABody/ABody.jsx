import React from 'react';
import styled from 'styled-components';
import AOptions from './AOptions';

const AnswerBody = styled.div`
  background-color: rgb(220, 220, 220);
  height: 15%;
  border: 1px solid black;
  border-radius: 10px;
  width: 98%;
  margin: 0 auto;
  display: grid;
`;

const AnswerOptions = styled.div`
  background-color: rgb(220, 220, 220);
  padding: 5px;
`;

const AnswerText = styled.div`
  padding: 5px;
  display: inline;
`;

const ImageCarousel = styled.div`
  margin: 10px;
  height: 100px;
  border: 2px solid white;
  display: inline-block;
`;

class ABody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reported: false,
    };
    this.report = this.report.bind(this);
  }

  report() {
    const { onClickReport } = this.props;
    onClickReport();
    this.setState({
      reported: true,
    });
  }

  displayMore() {
    const { answersDisplayed } = this.state;
    this.setState({
      answersDisplayed: answersDisplayed + 2,
    });
  }

  render() {
    const {
      body, answerer_name, date, helpfulness, photos,
    } = this.props.answer;
    return (
      <AnswerBody>

        <AnswerText>
          <span className="answer">
            {body}
          </span>
        </AnswerText>
        { photos
          ? photos.map((photo, index) => (
            <ImageCarousel key={`${photo}+${index}`}>
              <img
                src={photos[index]}
                alt="description"
                width="100"
                height="100"
              />
            </ImageCarousel>
          ))
          : null }
        <div className="a options">
          <AnswerOptions>
            <AOptions
              onClickReport={this.report}
              answerer={answerer_name}
              date={date}
              helpfulness={helpfulness}
            />
          </AnswerOptions>
        </div>

      </AnswerBody>
    );
  }
}

export default ABody;
