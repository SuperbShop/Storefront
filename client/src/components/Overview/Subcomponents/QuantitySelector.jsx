import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const DDWrapper = styled.div`
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
  &:hover {
    border: 1px solid #535353;
    background-color: #000;
    transition: 0.5s;
    color: #fff;
  }
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
    background-color: #000;
    transition: 0.5s;
    color: #fff;
  }
`;

class QuantitySelector extends React.Component {
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
    setTimeout(() => {
      if (isListOpen) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  }

  selectItem(item) {
    const { resetThenSet } = this.props;
    this.setState({
      headerTitle: item,
      isListOpen: false,
    }, () => resetThenSet(item));
  }

  toggleList() {
    this.setState((prevState) => ({
      isListOpen: !prevState.isListOpen,
    }));
  }

  render() {
    const { isListOpen, headerTitle } = this.state;
    const { quantity, available } = this.props;

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
          {quantity.map((item) => (
            item - 1 < available
                && (
                  <DDListItems type="button" key={item} onClick={() => this.selectItem(item)}>
                    {item}
                  </DDListItems>
                )
          ))}
        </DDList>
        )}

      </DDWrapper>
    );
  }
}
export default QuantitySelector;
