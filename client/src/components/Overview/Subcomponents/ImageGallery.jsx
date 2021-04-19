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

const ImageGallery = ({ photos }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [currentPhoto, setCurrentPhoto] = useState();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <GalleryWrapper>
      <Carousel>
        {photos.map((photo, index) => (
          <Carousel.Item key={index += 1}><ImageWrapper src={photo.url} alt="product" /></Carousel.Item>
        ))}
      </Carousel>
    </GalleryWrapper>
  );
};

export default ImageGallery;
