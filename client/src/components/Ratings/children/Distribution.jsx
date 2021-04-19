import React from 'react';

const Distribution = ({ dist }) => {
  // console.log('distdata', dist);
  return (
    <div id="distribution">
      <button className="ReviewFilter" type="button">5 stars</button>
      <button className="ReviewFilter" type="button">4 stars</button>
      <button className="ReviewFilter" type="button">3 stars</button>
      <button className="ReviewFilter" type="button">2 stars</button>
      <button className="ReviewFilter" type="button">1 stars</button>
    </div>
  );
};

export default Distribution;
