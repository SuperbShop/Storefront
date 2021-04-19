import React from 'react';
import QBody from './QBody';

class QandABody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QandA: [],
    };
  }

  componentDidMount() {
    const { QandA } = this.props;
    this.setState({
      QandA: QandA,
    });
  }

  render() {
    const { results } = this.props.QandA;
    return (
      <section className="QA-Body">
        { results.map((result, index) => (
          <QBody question={result} key={`${index}`} />
        ))}
      </section>
    );
  }
}

export default QandABody;
