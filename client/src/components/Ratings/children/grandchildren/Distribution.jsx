import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const FlexboxDiv = styled.div`
  display: flex;
  flex-direction: column;
  `;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  width: 100%;
  height: 30px;
  `;

const QuantityContainer = styled.div`
margin-left: 25px;
  `;

const StyledButton = styled.button`
  background-color: white;
  width: 25%;
  text-decoration: underline;
  line-height: normal;
  border: none;
  `;

const BackdropDiv = styled.div`
  background-color: lightgrey;
  position: relative;
  height: 0.6em;
  width: 50%;
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
    this.props.filterBy(event.target.id[0]);

    const newLocalFilters = this.state.localFilters.slice();
    if (!newLocalFilters.includes(event.target.id[0])) {
      newLocalFilters.push(event.target.id[0]);
    } else {
      const index = newLocalFilters.indexOf(event.target.id[0]);
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

    let graphData = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let adjustedGraphData = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    let mostCommonReview = 0;
    let allScores = [];
    if (this.props.dist !== undefined) {
      allScores = Object.keys(this.props.dist);
      allScores.forEach(score => {
        graphData[score] = Number(this.props.dist[score]);
        if (Number(this.props.dist[score]) > mostCommonReview) {
          mostCommonReview = score;
        }
      });
      for (var key in graphData) {
        if (key !== mostCommonReview) {
          adjustedGraphData[key] = (graphData[key] / graphData[mostCommonReview]) * 100;
        }
      }
      adjustedGraphData[mostCommonReview] = 100;
    }

    const ScoreDiv5 = styled.div`
      position: absolute;
      background-color: green;
      height: 0.6em;
      width: ${adjustedGraphData[5]}%;
      `;

    const ScoreDiv4 = styled.div`
      position: absolute;
      background-color: green;
      height: 0.6em;
      width: ${adjustedGraphData[4]}%;
      `;
    const ScoreDiv3 = styled.div`
      position: absolute;
      background-color: green;
      height: 0.6em;
      width: ${adjustedGraphData[3]}%;
      `;
    const ScoreDiv2 = styled.div`
      position: absolute;
      background-color: green;
      height: 0.6em;
      width: ${adjustedGraphData[2]}%;
      `;
    const ScoreDiv1 = styled.div`
      position: absolute;
      background-color: green;
      height: 0.6em;
      width: ${adjustedGraphData[1]}%;
      `;



    return (
      <div>
        <FlexboxDiv>

          <ButtonContainer>
            <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="5button">5 stars</StyledButton>
            <BackdropDiv onClick={this.handleRatingFilterClick} id="5Backdrop">
              <ScoreDiv5 onClick={this.handleRatingFilterClick} id="5ScoreDiv"></ScoreDiv5>
            </BackdropDiv>
            <QuantityContainer onClick={this.handleRatingFilterClick} id="5Quantity">{graphData[5]}</QuantityContainer>
          </ButtonContainer>

          <ButtonContainer>
            <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="4">4 stars</StyledButton>
            <BackdropDiv onClick={this.handleRatingFilterClick} id="4Backdrop">
              <ScoreDiv4 onClick={this.handleRatingFilterClick} id="4ScoreDiv"></ScoreDiv4>
            </BackdropDiv>
            <QuantityContainer onClick={this.handleRatingFilterClick} id="4Quantity">{graphData[4]}</QuantityContainer>
          </ButtonContainer>

          <ButtonContainer>
            <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="3">3 stars</StyledButton>
            <BackdropDiv onClick={this.handleRatingFilterClick} id="3Backdrop">
              <ScoreDiv3 onClick={this.handleRatingFilterClick} id="3ScoreDiv"></ScoreDiv3>
            </BackdropDiv>
            <QuantityContainer onClick={this.handleRatingFilterClick} id="3Quantity">{graphData[3]}</QuantityContainer>
          </ButtonContainer>

          <ButtonContainer>
            <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="2">2 stars</StyledButton>
            <BackdropDiv onClick={this.handleRatingFilterClick} id="2Backdrop">
              <ScoreDiv2 onClick={this.handleRatingFilterClick} id="2ScoreDiv"></ScoreDiv2>
            </BackdropDiv>
            <QuantityContainer onClick={this.handleRatingFilterClick} id="2Quantity">{graphData[2]}</QuantityContainer>
          </ButtonContainer>

          <ButtonContainer>
            <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="1">1 stars</StyledButton>
            <BackdropDiv onClick={this.handleRatingFilterClick} id="1Backdrop">
              <ScoreDiv1 onClick={this.handleRatingFilterClick} id="1ScoreDiv"></ScoreDiv1>
            </BackdropDiv>
            <QuantityContainer onClick={this.handleRatingFilterClick} id="1Quantity">{graphData[1]}</QuantityContainer>
          </ButtonContainer>

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


{/* <div>
        <FlexboxDiv>
          <ButtonContainer>
            <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="5">5 stars</StyledButton>
            <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="4">4 stars</StyledButton>
            <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="3">3 stars</StyledButton>
            <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="2">2 stars</StyledButton>
            <StyledButton className="ReviewFilter" onClick={this.handleRatingFilterClick} type="button" id="1">1 stars</StyledButton>
          </ButtonContainer>
          <TableContainer>
            <ScoreDiv></ScoreDiv>
            <BackdropDiv></BackdropDiv>
            <ScoreDiv></ScoreDiv>
            <BackdropDiv></BackdropDiv>
            <ScoreDiv></ScoreDiv>
            <BackdropDiv></BackdropDiv>
            <ScoreDiv></ScoreDiv>
            <BackdropDiv></BackdropDiv>
            <ScoreDiv></ScoreDiv>
            <BackdropDiv></BackdropDiv>
          </TableContainer>
          <QuantityContainer>#</QuantityContainer>
        </FlexboxDiv>
        {filterStatus}

      </div> */}