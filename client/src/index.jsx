/* eslint-disable import/extensions */

import ReactDOM from 'react-dom';
import React from 'react';
import Overview from './components/Overview/Overview.jsx';
import Questions from './components/Questions/Questions.jsx';
import Ratings from './components/Ratings/Ratings.jsx';
import RelatedItems from './components/RelatedItems/RelatedItems.jsx';

const App = () => (
  <div>
    <section className="overview module"><Overview /></section>
    <section className="questions module"><Questions /></section>
    <section className="ratings module"><Ratings /></section>
    <section className="related-items module"><RelatedItems /></section>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
