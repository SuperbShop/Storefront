import React from 'react';
import styled from 'styled-components';

const FlexboxDiv = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  padding: 5px;
  `;

const Distribution = ({ dist }) => {
  console.log('distdata', dist);
  return (
    <FlexboxDiv>
      <button className="ReviewFilter" type="button">5 stars</button>
      <button className="ReviewFilter" type="button">4 stars</button>
      <button className="ReviewFilter" type="button">3 stars</button>
      <button className="ReviewFilter" type="button">2 stars</button>
      <button className="ReviewFilter" type="button">1 stars</button>
    </FlexboxDiv>
  );
};

export default Distribution;
