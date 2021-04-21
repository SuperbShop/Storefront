import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';

const GalleryWrapper = styled.div`
  padding-right: 1.5rem;
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 80vh;
`;

const Thumbnail = styled.img`
  justify-content: space-between;
  align-items: center;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin: 5px;
  object-fit: cover;
  opacity: 0.5;
`;

const Wrapper = styled.div`
  display: flex;
`;

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
  }

  render() {
    const { selectedStyle } = this.props;
    return (
      <GalleryWrapper>
        <Carousel fade>
          {selectedStyle.photos && selectedStyle.photos.map((photo, index) => (
            <Carousel.Item key={index}>
              <Wrapper>
                <Image src={photo.url || 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'} alt="product" />
              </Wrapper>
            </Carousel.Item>
          ))}
        </Carousel>
        <Wrapper>
          {selectedStyle.photos && selectedStyle.photos.map((photo, index) => (
              <Thumbnail key={index} src={photo.thumbnail_url || 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'} alt="product" />
          ))}
        </Wrapper>
      </GalleryWrapper>
    );
  }
}

export default ImageGallery;
