import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import QandAHeader from './QandAHeader';
import QandABody from './QandABody';
import config from '../../../../config';

const AppBody = styled.div`
  width: 100%;
  display: flex-box;
  justify-content: center;
`;

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsDisplayed: 2,
      showAskQuestion: false,
      showAddAnswer: false,
      showImageCarousel: false,
      QandA: {
        product_id: 0,
        results: [{
          answers: {
            0: {
              answerer_name: '',
              body: '',
              date: '',
              helpfulness: 0,
              id: 0,
              photos: [''],
            },
          },
          asker_name: '',
          question_body: '',
          question_date: '',
          question_helpfulness: 0,
          question_id: 0,
          reported: false,
        }],
      },
    };
    this.getProduct = this.getProduct.bind(this);
    this.productIdUp = this.productIdUp.bind(this);
    this.productIdDown = this.productIdDown.bind(this);
    this.displayMore = this.displayMore.bind(this);
    this.collapse = this.collapse.bind(this);
    this.refresh = this.refresh.bind(this);
    this.bindSubmit = this.bindSubmit.bind(this);
  }

  componentDidMount() {
    const { productId } = this.props;
    this.getProduct(productId.toString());
  }

  getProduct(id) {
    $.ajax({
      method: 'GET',
      url: `/api/${id}/questions`,
      headers: {
        Authorization: config.TOKEN,
      },
      success: (data) => {
        console.log('getting new questions');
        this.setState({
          QandA: data,
        });
        console.log("RESPONSE IS:",data);
      },
      error: (error) => { console.log('Youre a failure', error); },
    });
  }

  bindSubmit() {
    const { setSubmit } = this.props;
    setSubmit(this.getProduct);
  }

  collapse() {
    this.setState({
      questionsDisplayed: 2,
    });
  }

  refresh(id) {
    this.getProduct(id);
    this.setState({
      questionsDisplayed: 2,
    });
  }

  displayMore() {
    const { questionsDisplayed } = this.state;
    this.setState({
      questionsDisplayed: questionsDisplayed + 2,
    });
  }

  productIdUp() {
    const {
      productId,
      incrementClick,
    } = this.props;
    incrementClick();
    this.getProduct((productId + 1).toString());
    this.setState({
      questionsDisplayed: 2,
    });
  }

  productIdDown() {
    const {
      productId,
      decrementClick,
    } = this.props;
    decrementClick();
    this.getProduct((productId - 1).toString());
    this.setState({
      questionsDisplayed: 2,
    });
  }

  render() {
    const {
      QandA,
      questionsDisplayed,
    } = this.state;
    const {
      toggleAskQuestionModal,
      toggleAddAnswerModal,
      toggleImageCarouselModal,
      setFeaturedImages,
    } = this.props;
    const numOfTotalQs = QandA.results.length;
    return (
      <AppBody className="QuestionsAndAnswers">
        <button type="submit" onClick={this.productIdUp}>+</button>
        <span>{QandA.product_id}</span>
        <button type="submit" onClick={this.productIdDown}>-</button>
        <QandAHeader
          total={numOfTotalQs}
          QandA={QandA}
          toggleAskQuestionModal={toggleAskQuestionModal}
          refresh={this.refresh}
        />
        <QandABody
          QandA={QandA}
          questionsDisplayed={questionsDisplayed}
          collapse={this.collapse}
          displayMore={this.displayMore}
          refresh={this.refresh}
          toggleAskQuestionModal={toggleAskQuestionModal}
          toggleAddAnswerModal={toggleAddAnswerModal}
          toggleImageCarouselModal={toggleImageCarouselModal}
          bindSubmit={this.bindSubmit}
          setFeaturedImages={setFeaturedImages}
        />
      </AppBody>
    );
  }
}

export default Questions;
