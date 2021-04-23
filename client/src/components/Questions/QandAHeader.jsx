import React from 'react';
import styled from 'styled-components';
import QBody from './QandABody/QBody';

const HeaderComponent = styled.div`
  background-color: black;
  color: white;
  display: flex-box;
  border: 5px solid white;
  width: 80%;
  margin: 0 auto 15px auto;
  padding: 15px;
`;

const SearchBar = styled.input`
  color: black;
  background-color: white;
  margin: 0 auto;
  border: 1px solid black;
  width: 100%
`;

const AddQButton = styled.button`
  color: white;
  background-color: black;
  border: 5px solid white;
  border-radius: 30px;
  display: grid;
  padding: 15px 25px;
  margin: 15px auto 0 auto;
`;

const searchQuestions = (query, arr) => {
  return arr.filter((val) => (
    val.question_body.includes(query)
  ))
}

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
    const truthTest = this.props.total > 0;
    const truthTest2 = this.state.search.length > 3;
    const { search } = this.state;
    const { QandA} = this.props;
    return (
      <HeaderComponent className="q-and-a-header">
        <h2>
          Questions &amp; Answers
        </h2>
        <SearchBar
          name="search"
          value={this.state.search}
          placeholder="Have A Question? Search for Answers"
          onChange={this.changeHandler}
        />
        { truthTest
          ? <div></div>
          : <AddQButton>Add A Question</AddQButton>}
        { truthTest2
          ? searchQuestions(search, QandA.results).map((result, index) => (
          <QBody question={result} key={`${index}`} />))
          : <div></div>
        }
      </HeaderComponent>
    );
  }
}

export default QandAHeader;
