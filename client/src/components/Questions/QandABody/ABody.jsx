import React from 'react';
import styled from 'styled-components';
import AOptions from './AOptions';

const AnswerBody = styled.div`
  background-color: rgb(220, 220, 220);
  border: 1px solid rgb(150, 150, 150);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px 10px 0 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.55) 0px 3px 8px;
    transition: 0.5s;
  }
`;

const AnswerOptions = styled.div`
  background-color: rgb(220, 220, 220);
  display: flex;
  justify-content: flex-end;
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

const ImagesDiv = styled.div`
  display: flex;
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
    const { product_id, question_id } = this.props;
    const {
      id, body, answerer_name, date, helpfulness, photos,
    } = this.props.answer;
    return (
      <AnswerBody>

        <AnswerText>
          {body}
        </AnswerText>

        { photos
          ? (
            <ImagesDiv>
              {
              photos.map((photo, index) => (
                <ImageWrapper
                  src={photos[index]}
                  alt="description"
                  width="100"
                  height="100"
                  onClick={this.props.toggleImageCarouselModal}
                  key={`${photo}+${index}`}
                />
              ))
            }
            </ImagesDiv>
          )
          : null }

        <div className="a options">
          <AnswerOptions>
            <div>
              <AOptions
                answer_id={id}
                product_id={product_id}
                question_id={question_id}
                onClickReport={this.report}
                answerer={answerer_name}
                date={date}
                helpfulness={helpfulness}
              />
            </div>
          </AnswerOptions>
        </div>

      </AnswerBody>
    );
  }
}

export default ABody;
