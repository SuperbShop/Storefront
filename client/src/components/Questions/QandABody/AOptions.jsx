import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import axios from 'axios';

const OptionsContainer = styled.div`
  display: flex-grid;
  font-size: 0.7em;
  position: relative;
  grid-template-columns: 1fr 1fr;
`;

const AOptionItem = styled.div`
  float: right;
  background: none!important;
  border: none;
  color: black;
  margin-right: 10px;
`;

const AOptionButton = styled.button`
  background: none!important;
  border: none;
  color: black;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

class AOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: false,
      helpfulClicked: false,
    };
    this.onClickHelpful = this.onClickHelpful.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      helpful: false,
    });
  }

  onClickHelpful() {
    const { answer_id } = this.props;
    const { helpful, helpfulClicked } = this.state;
    const url = `/api/answers/${answer_id}/helpful`;
    if (!helpful && !helpfulClicked) {
      axios.put(url)
        .then(() => {
          console.log(answer_id, ' Marked Helpful');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.setState({
      helpful: !helpful,
      helpfulClicked: true,
    });
  }

  render() {
    const { answerer, date, helpfulness } = this.props;
    const { helpful } = this.state;
    const helpfulClicked = helpfulness + 1;
    return (
      <OptionsContainer className="options container">
        <AOptionItem className="option username">
          {answerer}
        </AOptionItem>
        <AOptionItem className="option date">
          {moment(date, 'YYYY-MM--DD HH:mm:ss').format('MMMM Do YYYY')}
        </AOptionItem>
        <AOptionItem className="option helpful">
          <AOptionButton type="submit" onClick={this.onClickHelpful}>
            { helpful
              ? (<div>Helpful? Yes (<strong>{helpfulClicked}</strong>)</div>)
              : (<div>Helpful? Yes ({helpfulness})</div>)}
          </AOptionButton>
        </AOptionItem>
      </OptionsContainer>
    );
  }
}

export default AOptions;
