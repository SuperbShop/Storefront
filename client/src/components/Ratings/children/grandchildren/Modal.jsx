import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
// We get hold of the div with the id modal that we have created in index.html
const modalRoot = document.getElementById('modal');

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.element = document.createElement('div');
  }

  // We append the created div to the div#modal
  componentDidMount() {
    modalRoot.appendChild(this.element);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.element);
  }

  render() {
    const { children } = this.props;
    return createPortal(children, this.element);
  }
}

Modal.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Modal;
