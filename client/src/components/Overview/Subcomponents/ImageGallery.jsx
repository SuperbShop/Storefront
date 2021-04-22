import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ImageGallery = ({  photos }) => {
  const [current, setCurrent] = useState(0);
  const [thumbnail, setThumbnail] = useState(0);
  // const [index, setIndex] = useState(0);
  // const [images, setImages] = useState([]);
  // const [thumbnails, setThumbnails] = useState([]);

  const nextSlide = () => {
    if (current !== photos.length - 1) {
      setCurrent(current + 1);
      setThumbnail(thumbnail + 1);
    }
  };

  // const getImages = () => {
  //   const imagesArr = [];
  //   const thumbsArr = [];
  //   for (let i = 0; i < photos.length; i++) {
  //     imagesArr.push(photos[i].url);
  //     thumbsArr.push(photos[i].thumbnail_url);
  //   }
  //   setImages(imagesArr);
  //   setThumbnails(thumbsArr);
  // };

  const handleClick = (index) => {
    setCurrent(index);
    setThumbnail(index);
  };

  const prevSlide = () => {
    if (current !== 0) {
      setCurrent(current - 1);
      setThumbnail(thumbnail - 1);
    }
  };

  // useEffect(() => {
  //   getImages();
  // }, [photos]);

  const expandedView = () => {
    alert('expandedView');
  };

  if (!Array.isArray(photos) || photos.length === 0) {
    return null;
  }

  return (
    <div>
      <section className="thumb-slider">
        {photos.map((photo, index) => (
          <img
            className={index === current ? 'thumbnail active' : 'thumbnail'}
            key={index}
            src={photo.thumbnail_url}
            alt="product"
            onClick={() => handleClick(index)}
          />
        ))}
      </section>
      <section className="slider">
        {
      current === 0 ? <FontAwesomeIcon icon={faArrowLeft} className="left-arrow hidden" onClick={prevSlide} /> : <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" onClick={prevSlide} />
}
        {current === photos.length - 1 ? <FontAwesomeIcon icon={faArrowRight} className="right-arrow hidden" onClick={nextSlide} /> : <FontAwesomeIcon icon={faArrowRight} className="right-arrow" onClick={nextSlide} />}
        {photos.map((photo, index) => (
          <div className={index === current ? 'slide active' : 'slide'} key={index} onClick={expandedView}>
            {index === current && (<img className="image" src={photo.url} alt="product" />) }
          </div>
        ))}
      </section>

    </div>
  );
};

export default ImageGallery;
