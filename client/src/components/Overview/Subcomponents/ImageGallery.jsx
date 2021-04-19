import React from 'react';
import styled from 'styled-components';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { photos } = this.props;
    return (
      <div>
        <h1>ImageGallery</h1>
        <div>
          {photos.map((photo) => (
            <img src={photo.thumbnail_url} />
          ))}
        </div>
      </div>
    );
  }
}

export default ImageGallery;
