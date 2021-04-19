import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';

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
    <Carousel className="carousel">
      {photos.map((photo, index) => (
        <Carousel.Item><ImageWrapper key={index += 1} src={photo.url} alt="product" /></Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageGallery;
