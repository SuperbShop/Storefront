import ReactDOM from 'react-dom';
import React from 'react';
import Overview from './components/Overview/Overview';
import Questions from './components/Questions';
import Ratings from './components/Ratings/Ratings';
import AskQuestion from './components/Questions/Modal/AskQuestion';
import AddAnswer from './components/Questions/Modal/AddAnswer';
import ImageCarousel from './components/Questions/Modal/ImageCarousel';

// store clicks object
window.clicks = [];

const time = new Date();

const clickTracker = (WrappedComponent, module) => (props) => (
  // For each click on the page, capture:
  // Element of the page which was clicked
  // Time of click
  // Module clicked
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
      product: '23145',
      productId: 23165,
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

  incrementProduct() {
    const id = (parseInt(this.state.productId) + 1).toString();
    this.setState({
      product: id,
      productId: parseInt(id),
    });
  }

  decrementProduct() {
    const id = (this.state.productId - 1).toString();
    this.setState({
      product: id,
      productId: parseInt(id),
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

  toggleAddAnswerModal(input) {
    const { showAddAnswerModal } = this.state;
    if (!input) {
      this.setState({
        showAddAnswerModal: input,
      });
    } else {
      this.setState({
        showAddAnswerModal: !showAddAnswerModal,
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
      showAskQuestionModal,
      showImageCarouselModal,
      showAddAnswerModal,
    } = this.state;

    return (
      <>
        <AskQuestion
          showAskQuestionModal={showAskQuestionModal}
          toggleAskQuestionModal={this.toggleAskQuestionModal}
        />
        <AddAnswer
          showAddAnswerModal={showAddAnswerModal}
          toggleAddAnswerModal={this.toggleAddAnswerModal}
        />
        <ImageCarousel
          showImageCarouselModal={showImageCarouselModal}
          toggleImageCarouselModal={this.toggleImageCarouselModal}
        />
        <section className="overview module"><TrackedOverview productId={productId} /></section>
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
        <section className="ratings module"><TrackedRatings product={productId} /></section>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
