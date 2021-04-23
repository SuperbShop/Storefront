import ReactDOM from 'react-dom';
import React from 'react';
import styled from 'styled-components';
import Overview from './components/Overview/Overview';
import Questions from './components/Questions';
import Ratings from './components/Ratings/Ratings';
import RelatedItems from './components/RelatedItems/RelatedItems';

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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: 23145,
      product: '23145',
    };
  }

  render() {
    const { productId, product } = this.state;
    return (
      <div>
        <section className="overview module"><TrackedOverview productId={productId} /></section>
        <section className="questions module"><Questions product={product} /></section>
        <section className="ratings module"><Ratings product={product} /></section>
        <section className="related-items module"><RelatedItems product={product} /></section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
