/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ReactDOM from 'react-dom';
import React, { Suspense } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import styled, { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Overview from './components/Overview/Overview';
const Questions = React.lazy(() => import('./components/Questions'));
const Ratings = React.lazy(() => import('./components/Ratings/Ratings'));
const AskQuestion = React.lazy(() => import('./components/Questions/Modal/AskQuestion'));
const AddAnswer = React.lazy(() => import('./components/Questions/Modal/AddAnswer'));
const ImageCarousel = React.lazy(() => import('./components/Questions/Modal/ImageCarousel'));
const Search = React.lazy(() => import('./components/SharedComponents/Search'));
import { lightTheme, darkTheme, GlobalStyles } from './components/SharedComponents/themes';

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const Logo = styled.img`
  margin-left: 20px;
`;

const Toggle = styled.button`
  position: absolute;
  right: 20%;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  background: #dc3545;
  transition: all .5s ease;
  &:focus {
    outline: none;
  }
`;

const Message = styled.h1`
  padding-top: 1rem;
  font-size: 15px;
  text-align: center;
  text-transform: uppercase;
  &:hover {
    color: red;
  }
`;

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
      showImageCarouselModal: false,
      showAskQuestionModal: false,
      showAddAnswerModal: false,
      theme: 'light',
    };
    this.incrementProduct = this.incrementProduct.bind(this);
    this.decrementProduct = this.decrementProduct.bind(this);
    this.toggleAskQuestionModal = this.toggleAskQuestionModal.bind(this);
    this.toggleAddAnswerModal = this.toggleAddAnswerModal.bind(this);
    this.toggleImageCarouselModal = this.toggleImageCarouselModal.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  incrementProduct() {
    const { productId } = this.state;
    const id = (productId + 1).toString();
    this.setState({
      product: id,
      productId: parseInt(id),
    });
  }

  decrementProduct() {
    const { productId } = this.state;
    const id = (productId - 1).toString();
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

  toggleTheme() {
    const { theme } = this.state;
    if (theme === 'light') {
      this.setState({
        theme: 'dark',
      });
    } else {
      this.setState({
        theme: 'light',
      });
    }
  }

  render() {
    const {
      product,
      productId,
      showAskQuestionModal,
      showImageCarouselModal,
      showAddAnswerModal, theme,
    } = this.state;

    return (
      productId !== undefined ? (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <GlobalStyles />
          <StyledApp>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/">
                <Logo 
                width="50%" 
                src="https://res.cloudinary.com/willtrinh/image/upload/c_limit,w_180/v1619741251/81097bf6535ece52424ab0679d6f807c_vmncgu.png"
                alt="supreme-font"
                border="0" />
                </Navbar.Brand>
              <Suspense fallback={<div>Loading...</div>}><Search /></Suspense>
              <Toggle 
              type="button"
              aria-label="Toggle Theme Button"
              onClick={() => this.toggleTheme()}>
                {theme === 'light'
                ? <FontAwesomeIcon icon={faSun} color="white" />
                : <FontAwesomeIcon icon={faMoon} color="white" />}
                </Toggle>
            </Navbar>
            <Message>
              Free Shipping & Returns! - Sale / Discount
              <em> OFFER</em>
              {' '}
              -
              <a href="/"> New Product Highlight</a>
            </Message>
            <section className="overview module">
              <TrackedOverview
                productId={productId}
              />
            </section>
            <Suspense fallback={<div>Loading...</div>}>
              <AskQuestion
                showAskQuestionModal={showAskQuestionModal}
                toggleAskQuestionModal={this.toggleAskQuestionModal}
                productId={productId}
              />
              <AddAnswer
              showAddAnswerModal={showAddAnswerModal}
              toggleAddAnswerModal={this.toggleAddAnswerModal}
            />
              <ImageCarousel
                showImageCarouselModal={showImageCarouselModal}
                toggleImageCarouselModal={this.toggleImageCarouselModal}
              />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <section className="ratings module" id="Reviews"><TrackedRatings product={productId} /></section>
            </Suspense>
            
          </StyledApp>
        </ThemeProvider>
      ) : null
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
