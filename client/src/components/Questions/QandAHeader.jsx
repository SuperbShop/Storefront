import React from 'react';
import styled from 'styled-components';
import QBody from './QandABody/QBody';

const HeaderComponent = styled.div`
  color: black;
  background-color: white;
  border: 5px solid white;
  width: 100%;
  margin: 0 auto 15px auto;
`;

const SearchBar = styled.input`
  color: black;
  background-color: white;
  margin: 0 auto;
  border: 1px solid black;
  width: 100%;
  height: 50px;
  font-size: 25px;
`;

const ButtonsWrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const SearchResults = styled.div`
  background-color: grey;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 2px 5px 10px 5px;
  max-height: 400px;
  overflow-y: auto;
`;

const AddQButton = styled.button`
  color: black;
  background-color: white;
  border: 2px solid black;
  width: 250px;
  padding: 10px 20px;
  margin: 15px;
  display: grid;
`;

const searchQuestions = (query, arr) => arr.filter((val) => (
  val.question_body.includes(query)
));

class QandAHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { search } = this.state;
    const { QandA, total, toggleAskQuestionModal } = this.props;
    const atLeastOneQuestionAsked = total > 0;
    const searchQueryIsMoreThan3Chars = search.length > 3;
    return (
      <HeaderComponent className="q-and-a-header">
        <h2>
          Questions &amp; Answers
        </h2>
        <SearchBar
          name="search"
          value={search}
          placeholder="Have A Question? Search for Answers"
          onChange={this.changeHandler}
        />
        { atLeastOneQuestionAsked
          ? null
          : (
            <ButtonsWrapper>
              <AddQButton onClick={toggleAskQuestionModal}>
                + Add A Question
              </AddQButton>
            </ButtonsWrapper>
          )}
        { searchQueryIsMoreThan3Chars
          ? (
            <SearchResults>
              { searchQuestions(search, QandA.results).map((result, index) => (
                <QBody question={result} key={`${index}`} />)) }
            </SearchResults>
          )
          : null}
      </HeaderComponent>
    );
  }
}

export default QandAHeader;
