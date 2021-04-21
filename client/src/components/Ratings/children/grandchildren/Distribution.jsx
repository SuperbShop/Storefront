import React from 'react';
import styled from 'styled-components';

const FlexboxDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  `;

const ButtonContainer = styled.div`
  flex-direction: column;
  width: 70px;
  text-align: center;
  height: 150px;
  line-height: 1.9;
  `;
const TableContainer = styled.div`
  width: 100%;
  color: white;
  border: 1px solid grey;
  `;

const QuantityContainer = styled.div`
  border: 1px solid grey;
  width: 25px;
  `;

const StyledButton = styled.button`
  background-color: white;
  height: 1.5em;
  width: 52px;
  border: none;
  text-decoration: underline;
  `;

const StyledSpan = styled.span`
  display: flex;
  justify-content: space-between;
  `;

class Distribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localFilters: [],
    };

    this.handleRatingFilterClick = this.handleRatingFilterClick.bind(this);
    this.handleClearFiltersClick = this.handleClearFiltersClick.bind(this);
  }

  handleRatingFilterClick(event) {
    this.props.filterBy(event.target.id);

    const newLocalFilters = this.state.localFilters.slice();
    if (!newLocalFilters.includes(event.target.id)) {
      newLocalFilters.push(event.target.id);
    } else {
      const index = newLocalFilters.indexOf(event.target.id);
      newLocalFilters.splice(index, 1);
    }
    this.setState({
      localFilters: newLocalFilters,
    });
  }

  // NEED TO FIGURE OUT HOW TO DO THIS - NEEDS TO CLEAR FILTERS LOCALLY AND ON RATINGSJSX
  handleClearFiltersClick() {
    console.log('clear filters');
    // this.state.localFilters.forEach((value) => this.props.filterBy(value));
  }

  render() {
    let filterStatus;
    if (this.state.localFilters.length > 0) {
      let filtersString = 'Reviews filtered by: ';
      this.state.localFilters.forEach((num) => filtersString += `${num}, `);

      filterStatus = (
        <StyledSpan>
          {filtersString}
          <button onClick={this.handleClearFiltersClick} id="ClearFilters">Clear</button>
        </StyledSpan>
      );
    } else {
      filterStatus = '';
    }
    return (
      <div>
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
        {filterStatus}

      </div>
    );
  }
}
// ratings distrubition data is brought to this component in props
// need to display it in a chart
// need to make all the below buttons filter ReviewsList by that rating

export default Distribution;
