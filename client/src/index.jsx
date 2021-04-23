import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import Overview from './components/Overview/Overview';
import Questions from './components/Questions';
import Ratings from './components/Ratings/Ratings';
import RelatedItems from './components/RelatedItems/RelatedItems';
import Modal from './components/Questions/Modal';
import AskQuestion from './components/Questions/Modal/AskQuestion';

const PageBlockerModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.8;
  background-color: rgba(128,128,128,0.5);
  `;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      product: '23146',
      productId: 23146,
      showModal: false,
    };
    this.incrementProduct = this.incrementProduct.bind(this);
    this.decrementProduct = this.decrementProduct.bind(this);
    this.openModal = this.openModal.bind(this);
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

  openModal(input) {
    const { showModal } = this.state;
    if (!input) {
      this.setState({
        showModal: input,
      });
    } else {
      this.setState({
        showModal: !showModal,
      });
    }
  }

  render() {
    const { product, productId, showModal } = this.state;

    return (
      <div>
        <button type="submit" onClick={this.openModal}>MODAL ME</button>
        <section className="overview module"><Overview productId={productId} /></section>
        <section className="questions module">
          <AskQuestion showModal={showModal} openModal={this.openModal} />
          <Questions
            productId={productId}
            product={product}
            incrementClick={this.incrementProduct}
            decrementClick={this.decrementProduct}
            openModal={this.openModal}
          />
        </section>
        <section className="ratings module"><Ratings product={product} /></section>
        <section className="related-items module"><RelatedItems product={product} /></section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
