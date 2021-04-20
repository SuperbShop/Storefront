import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const DDWrapper = styled.div``;

const DDHeader = styled.button``;

const DDTitle = styled.div``;

const DDList = styled.div``;

const DDListItems = styled.button``;

class SizeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false,
      headerTitle: this.props.title,
    };
    this.selectItem = this.selectItem.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  componentDidMount() {
    const { isListOpen } = this.state;
    setTimeout(() => {
      if (isListOpen) {
        window.addEventListener('click', this.closeMenu);
      } else {
        window.removeEventListener('click', this.closeMenu);
      }
    }, 0);
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

  closeMenu() {
    this.setState({
      isListOpen: false,
    });
  }

  openMenu() {
    this.setState({
      isListOpen: true,
    });
  }

  render() {
    const { isListOpen, headerTitle } = this.state;
    const { skus } = this.props;

    return (
      <DDWrapper>
        <DDHeader onClick={this.toggleList}>
          <DDTitle>{headerTitle}</DDTitle>
          {isListOpen
            ? <FontAwesomeIcon icon={faAngleUp} size="2x" />
            : <FontAwesomeIcon icon={faAngleDown} size="2x" />}
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
        </DDHeader>
      </DDWrapper>
    );
  }
}
export default SizeSelector;
