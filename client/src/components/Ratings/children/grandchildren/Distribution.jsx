import React from 'react';
import styled from 'styled-components';

const FlexboxDiv = styled.div`
  display: flex;
  background-color: white;
  flex-direction: row;
  padding: 5px;
  `;

const ButtonContainer = styled.div`
  background-color: red;
  flex-direction: column;
  width: 70px;
  text-align: center;
  height: 150px;
  line-height: 1.9;
  `;
const TableContainer = styled.div`
  background-color: #CBC3E3;
  width: 100%;
  color: white;
  font-size: 50px;
  `;

const QuantityContainer = styled.div`
  background-color: pink;
  color: white;
  width: 25px;
  `;

const StyledButton = styled.button`
  height: 1.5em;
  width: 52px;
  border: none;
  text-decoration: underline;
  `;

class Distribution extends React.Component {
  constructor(props) {
    super(props);

    this.handleRatingFilterClick = this.handleRatingFilterClick.bind(this);
  }

  handleRatingFilterClick(event) {
    this.props.filterBy(event.target.id);
  }

  render() {
    return (
      <FlexboxDiv>
        <ButtonContainer>
        <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="5">5 stars</StyledButton>
        <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="4">4 stars</StyledButton>
        <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="3">3 stars</StyledButton>
        <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="2">2 stars</StyledButton>
        <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="1">1 stars</StyledButton>
        </ButtonContainer>
        <TableContainer>Table Container</TableContainer>
        <QuantityContainer>#</QuantityContainer>
      </FlexboxDiv>
    );
  }
}
// ratings distrubition data is brought to this component in props
// need to display it in a chart
// need to make all the below buttons filter ReviewsList by that rating

export default Distribution;
