import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import QandAHeader from './QandAHeader';
import QandABody from './QandABody';
import config from '../../../../config';

const AppBody = styled.div`
  background-color: #fff;
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
          question_date: '2019-01-17T00:00:00.000Z',
          question_helpfulness: 0,
          question_id: 1017420,
          reported: false,
        }],
      },
    };
    this.getProduct = this.getProduct.bind(this);
    this.productIdUp = this.productIdUp.bind(this);
    this.productIdDown = this.productIdDown.bind(this);
    this.displayMore = this.displayMore.bind(this);
    this.collapse = this.collapse.bind(this);
    this.setShowAskQuestion = this.setShowAskQuestion.bind(this);
  }

  componentDidMount() {
    const { product } = this.props;
    this.getProduct(product);
  }

  displayMore() {
    const { questionsDisplayed } = this.state;
    this.setState({
      questionsDisplayed: questionsDisplayed + 2,
    });
  }

  setShowAskQuestion() {
    const { showAskQuestion } = this.state;
    this.setState({
      showAskQuestion: !showAskQuestion,
    });
  }

  collapse() {
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

  getProduct(id) {
    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions?product_id=${id}`,
      headers: {
        Authorization: config.TOKEN,
      },
      success: (data) => {
        // console.log('id: ', id);
        // console.log('data: ', data);
        this.setState({
          QandA: data,
        });
      },
      error: (error) => { console.log('Youre a failure', error); },
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
      toggleImageCarouselModal
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
        />
        <QandABody
          QandA={QandA}
          questionsDisplayed={questionsDisplayed}
          collapse={this.collapse}
          displayMore={this.displayMore}
          toggleAskQuestionModal={toggleAskQuestionModal}
          toggleAddAnswerModal={toggleAddAnswerModal}
          toggleImageCarouselModal={toggleImageCarouselModal}
        />
      </AppBody>
    );
  }
}

export default Questions;
