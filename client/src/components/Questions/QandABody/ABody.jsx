import React from 'react';
import styled from 'styled-components';
import AOptions from './AOptions';

const AnswerBody = styled.div`
  background-color: rgb(220, 220, 220);
  border: 1px solid rgb(150, 150, 150);
  border-radius: 10px 10px 0 10px;
  display: grid;
  margin-bottom: 10px;
`;

const AnswerOptions = styled.div`
  background-color: rgb(220, 220, 220);
  padding: 5px;
  margin: auto;
`;

const AnswerText = styled.div`
  text-size: 1.5em;
  margin-left: 10px;
`;

const ImageWrapper = styled.img`
  margin: 10px;
  height: 100px;
  border: 2px solid black;
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
          {body}
        </AnswerText>

        { photos
          ? photos.map((photo, index) => (
            <ImageWrapper
              src={photos[index]}
              alt="description"
              width="100"
              height="100"
              onClick={this.props.toggleImageCarouselModal}
              key={`${photo}+${index}`}
            />
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
