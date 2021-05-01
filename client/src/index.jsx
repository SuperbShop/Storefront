/*
  eslint-disable react/jsx-props-no-spreading
  eslint-disable jsx-a11y/no-static-element-interactions
  eslint-disable jsx-a11y/click-events-have-key-events
*/
import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';
import Overview from './components/Overview/Overview';
import Questions from './components/Questions';
import Ratings from './components/Ratings/Ratings';
import AskQuestion from './components/Questions/Modal/AskQuestion';
import AddAnswer from './components/Questions/Modal/AddAnswer';
import ImageCarousel from './components/Questions/Modal/ImageCarousel';

window.clicks = [];

const time = new Date();

const clickTracker = (WrappedComponent, module) => (props) => (
  <div onClick={(event) => {
    const info = { element: event.target, time, module };
    console.log(info);
    window.clicks.push(info);
  }}
  >
    <WrappedComponent {...props} />
  </div>
);

const TrackedOverview = clickTracker(Overview, 'Overview');
const TrackedQuestions = clickTracker(Questions, 'Q&A');
const TrackedRatings = clickTracker(Ratings, 'Ratings');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      product: '23149',
      productId: 23149,
      productInfo: [],
      featuredQ: '',
      showImageCarouselModal: false,
      showAskQuestionModal: false,
      showAddAnswerModal: false,
    };
    this.incrementProduct = this.incrementProduct.bind(this);
    this.decrementProduct = this.decrementProduct.bind(this);
    this.toggleAskQuestionModal = this.toggleAskQuestionModal.bind(this);
    this.toggleAddAnswerModal = this.toggleAddAnswerModal.bind(this);
    this.toggleImageCarouselModal = this.toggleImageCarouselModal.bind(this);
  }

  componentDidMount() {
    const { productId } = this.state;
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${productId}`;
    axios.get(url)
      .then((data) => {
        this.setState({
          productInfo: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  incrementProduct() {
    const { productId } = this.state;
    const id = (productId + 1).toString();
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${id}`;
    axios.get(url)
      .then((data) => {
        this.setState({
          productInfo: data,
          product: id,
          productId: parseInt(id),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  decrementProduct() {
    const { productId } = this.state;
    const id = (productId - 1).toString();
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${id}`;
    axios.get(url)
      .then((data) => {
        this.setState({
          productInfo: data,
          product: id,
          productId: parseInt(id),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleAskQuestionModal(input) {
    const { showAskQuestionModal } = this.state;
    if (!input) {
      this.setState({
        showAskQuestionModal: input,
      });
    } else {
      this.setState({
        showAskQuestionModal: !showAskQuestionModal,
      });
    }
  }

  toggleAddAnswerModal(input, question) {
    const { showAddAnswerModal } = this.state;
    if (!input) {
      this.setState({
        showAddAnswerModal: input,
        featuredQ: question,
      });
    } else {
      this.setState({
        showAddAnswerModal: !showAddAnswerModal,
        featuredQ: question,
      });
    }
  }

  toggleImageCarouselModal(input) {
    const { showImageCarouselModal } = this.state;
    if (!input) {
      this.setState({
        showImageCarouselModal: input,
      });
    } else {
      this.setState({
        showImageCarouselModal: !showImageCarouselModal,
      });
    }
  }

  render() {
    const {
      product,
      productId,
      productInfo,
      showAskQuestionModal,
      showImageCarouselModal,
      showAddAnswerModal,
      featuredQ,
    } = this.state;

    return (
      productId !== undefined ? (
        <>
          <AskQuestion
            showAskQuestionModal={showAskQuestionModal}
            toggleAskQuestionModal={this.toggleAskQuestionModal}
            productInfo={productInfo}
            productId={productId}
          />
          <AddAnswer
            showAddAnswerModal={showAddAnswerModal}
            toggleAddAnswerModal={this.toggleAddAnswerModal}
            productInfo={productInfo}
            productId={productId}
            featuredQ={featuredQ}
          />
          <ImageCarousel
            showImageCarouselModal={showImageCarouselModal}
            toggleImageCarouselModal={this.toggleImageCarouselModal}
          />
          <section className="overview module">
            <TrackedOverview
              productId={productId}
            />
          </section>
          <section className="questions module">
            <TrackedQuestions
              productId={productId}
              product={product}
              incrementClick={this.incrementProduct}
              decrementClick={this.decrementProduct}
              toggleAskQuestionModal={this.toggleAskQuestionModal}
              toggleAddAnswerModal={this.toggleAddAnswerModal}
              toggleImageCarouselModal={this.toggleImageCarouselModal}
            />
          </section>
          <section className="ratings module" id="Reviews"><TrackedRatings product={productId} /></section>
        </>
      ) : null
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
