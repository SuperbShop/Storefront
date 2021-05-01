import React from 'react';
import styled from 'styled-components';
import AOptions from './AOptions';

const AnswerBody = styled.div`
  background-color: rgb(220, 220, 220);
  border: 1px solid rgb(150, 150, 150);
  border-radius: 10px 10px 0 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  box-shadow: 0 5px 10px 2px rgba(195,192,192,.5);
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
  color: black;
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
    this.launchImageModal = this.launchImageModal.bind(this);
    this.sendIndex = this.sendIndex.bind(this);
  }

  sendIndex(e) {
    console.log(e.target.getAttribute('src'));
  };

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

  launchImageModal(e) {
    const {
      setFeaturedImages,
      toggleImageCarouselModal,
      answer,
    } = this.props;
    const imgUrl = [e.target.getAttribute('src')];
    setFeaturedImages(imgUrl);
    toggleImageCarouselModal();
  }

  render() {
    const {
      answer,
      product_id,
      question_id,
    } = this.props;
    const {
      id,
      body,
      answerer_name,
      date,
      helpfulness,
      photos,
    } = answer;
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
                  onClick={this.launchImageModal}
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
