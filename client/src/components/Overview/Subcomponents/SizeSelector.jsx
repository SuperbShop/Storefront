import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const DDWrapper = styled.div`
  padding-right: 10px;
`;

const DDHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  color: #535353;
  padding: 15px;
  width: 100%;
  border: 1px solid #535353;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-weight: 500;
  font-size: 15px;
`;

const DDTitle = styled.div`
  font-weight: 500;
`;

const DDList = styled.div`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const DDListItems = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #535353;
  padding: 10px;
  width: 100%;
  border-style: none;
  &:hover {
    border: 1px solid #535353;
  }
`;

class SizeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false,
      headerTitle: this.props.title,
    };
    this.selectItem = this.selectItem.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  componentDidMount() {
    const { isListOpen } = this.state;
  }

  selectItem(item) {
    const { resetThenSet } = this.props;
    this.setState({
      headerTitle: item.size,
      isListOpen: false,
    }, () => resetThenSet(item.quantity, item.size));
  }

  toggleList() {
    this.setState((prevState) => ({
      isListOpen: !prevState.isListOpen,
    }));
  }

  checkInStock(item) {
    if (item.quantity < 1) {
      this.setState({ inStock: false});
    }
  }

  render() {
    const { isListOpen, headerTitle } = this.state;
    const { skus } = this.props;

    return (
      <DDWrapper>
        <DDHeader onClick={this.toggleList}>
          <DDTitle>{headerTitle}</DDTitle>
          {isListOpen
            ? <FontAwesomeIcon icon={faAngleUp} />
            : <FontAwesomeIcon icon={faAngleDown} />}
        </DDHeader>
        {isListOpen && (
        <DDList role="list">
          {Object.values(skus).map((item) => (
            item.quantity > 0
                && (
                  <DDListItems type="button" key={item.size} onClick={() => this.selectItem(item)}>
                    {item.size}
                  </DDListItems>
                )
          ))}
        </DDList>
        )}

      </DDWrapper>
    );
  }
}
export default SizeSelector;
