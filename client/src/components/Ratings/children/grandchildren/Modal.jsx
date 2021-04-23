import React from 'react';
import { createPortal } from 'react-dom';
// We get hold of the div with the id modal that we have created in index.html
const modalRoot = document.getElementById('modal');

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.element = document.createElement('div');
  }
  // We append the created div to the div#modal
  componentDidMount() {
    modalRoot.appendChild( this.element );
  }

  componentWillUnmount() {
    modalRoot.removeChild( this.element );
  }

  render() {
    return createPortal(this.props.children, this.element);
  }
}

export default Modal;
