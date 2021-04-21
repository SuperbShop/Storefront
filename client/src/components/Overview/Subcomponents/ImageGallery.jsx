import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';

const GalleryWrapper = styled.div`
  padding-right: 3rem;
`;
const ImageWrapper = styled.img`
  object-fit: cover;
  width: 100%;
  height: 80vh;
`;

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    const { photos } = props;
    this.state = {
      currentPhoto: photos[0]
    };
  }

  render() {
    const { photos, currentPhoto } = this.props;
    return (
      <GalleryWrapper>
        <Carousel>
          {photos.map((photo, index) => (
            <Carousel.Item key={index += 1}><ImageWrapper src={photo.url || 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'} alt="product" /></Carousel.Item>
          ))}
        </Carousel>
      </GalleryWrapper>
    );
  }
}

export default ImageGallery;
