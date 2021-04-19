import React from 'react';
import $ from 'jquery';
import QandAHeader from './QandAHeader';
import QandABody from './QandABody';
import QandAFooter from './QandAFooter';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QandA: {
        product_id: 0,
        results: [{
          answers: {0: {
            answerer_name: 'default',
            body: 'default',
            date: 'default',
            helpfulness: 0,
            id: 0,
            photos:['default']}},
          asker_name: 'default',
          question_body: 'default',
          question_date: '2019-01-17T00:00:00.000Z',
          question_helpfulness: 0,
          question_id: 1017420,
          reported: false,
        }],
      },
    };
    this.getProduct = this.getProduct.bind(this);
  }

  componentDidMount() {
    const { product } = this.props;
    this.getProduct(product);
  }

  report() {
    this.setState({
      reported: true,
    })
  }

  getProduct(id) {
    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions?product_id=${id}`,
      headers: {
        Authorization: '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',
      },
      success: (data) => {
        this.setState({
          QandA: data,
        });
      },
      error: (error) => { console.log(error); },
    });
  }

  render() {
    const { QandA } = this.state;
    return (
      <div className="QuestionsAndAnswers">
        <QandAHeader />
        <QandABody QandA={QandA} />
        <QandAFooter />
      </div>
    );
  }
}

export default Questions;
