import React from 'react';
import styled from 'styled-components';

const FlexboxDiv = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  padding: 5px;
  `;

const GraphPlaceHolder = styled.div`
  background-color: black;
  width: 100%;
  height: 10px;
  `;

const Distribution = ({ dist }) => {
  // ratings distrubition data is brought to this component in props
  // need to display it in a chart
  // need to make all the below buttons filter ReviewsList by that rating
  return (
    <FlexboxDiv>
      <button className="ReviewFilter" type="button">5 stars</button>
      <GraphPlaceHolder></GraphPlaceHolder>
      <button className="ReviewFilter" type="button">4 stars</button>
      <GraphPlaceHolder></GraphPlaceHolder>
      <button className="ReviewFilter" type="button">3 stars</button>
      <GraphPlaceHolder></GraphPlaceHolder>
      <button className="ReviewFilter" type="button">2 stars</button>
      <GraphPlaceHolder></GraphPlaceHolder>
      <button className="ReviewFilter" type="button">1 stars</button>
      <GraphPlaceHolder></GraphPlaceHolder>
    </FlexboxDiv>
  );
};

export default Distribution;
