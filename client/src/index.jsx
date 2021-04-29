/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ReactDOM from 'react-dom';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled, { ThemeProvider } from 'styled-components';
import Overview from './components/Overview/Overview';
import Questions from './components/Questions';
import Ratings from './components/Ratings/Ratings';
import AskQuestion from './components/Questions/Modal/AskQuestion';
import AddAnswer from './components/Questions/Modal/AddAnswer';
import ImageCarousel from './components/Questions/Modal/ImageCarousel';
import Search from './components/SharedComponents/Search';
import { lightTheme, darkTheme, GlobalStyles } from './components/SharedComponents/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const Logo = styled.img`
  width: 90px;
  height: 45px;
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
    (theme === 'light' ? this.setState({ theme: 'dark' }) : this.setState({ theme: 'light' }));
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
              <Navbar.Brand href="/"><Logo src="https://fontmeme.com/permalink/210429/81097bf6535ece52424ab0679d6f807c.png" alt="supreme-font" border="0" /></Navbar.Brand>
              <Search />
              <Toggle type="button" aria-label="Toggle Theme Button" onClick={() => this.toggleTheme()}>{theme === 'light' ? <FontAwesomeIcon icon={faSun} color="white" /> : <FontAwesomeIcon icon={faMoon} color="white" />}</Toggle>
            </Navbar>
            <Message>
              Free Shipping & Returns! - Sale / Discount
              <em> OFFER</em>
              {' '}
              -
              <a href="/"> New Product Highlight</a>
            </Message>
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
          </StyledApp>
        </ThemeProvider>
      ) : null
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
