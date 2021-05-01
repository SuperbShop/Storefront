import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faArrowRight, faCircle, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FullsizeImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 80vh;
  cursor: pointer;
`;

const ExtendedImageView = ({
  current, setCurrent, photos, thumbnail, setThumbnail, selectedImg, setSelectedImg,
}) => {
  const handleImageZoom = () => {
    const element = document.getElementsByClassName('backdrop')[0];
    element.classList.toggle('zoomed-img');
  };
  const nextSlide = () => {
    if (current !== photos.length - 1) {
      setCurrent(current + 1);
      setThumbnail(thumbnail + 1);
    }
  };

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
  return (
    <>
      <section className="backdrop">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={current === 0 ? 'left-arrow hidden' : 'left-arrow'}
          onClick={prevSlide}
        />
        <FontAwesomeIcon
          icon={faArrowRight}
          className={current === photos.length - 1 ? 'right-arrow hidden' : 'right-arrow'}
          onClick={nextSlide}
        />
        {photos.map((photo, index) => (
          <div
            className={index === current ? 'modal-slide active' : 'modal-slide'}
            key={photo.thumbnail_url}
            aria-hidden="true"
          >
            {index === current
        && (
        <FullsizeImage
          onClick={handleImageZoom}
          src={photo.url
        || 'https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-564x564.jpg'}
          alt="product photo"
        />
        ) }
          </div>
        ))}
        <FontAwesomeIcon icon={faTimes} className="closeBtn" onClick={() => setSelectedImg(!selectedImg)} />
      </section>
      <section className="modal-icons">
        {photos.map((photo, index) => (
          <FontAwesomeIcon
            icon={faCircle}
            className={index === current ? 'dots active' : 'dots'}
            key={photo.thumbnail_url}
            src={photo.thumbnail_url}
            alt="product photo"
            onClick={() => handleClick(index)}
            aria-hidden="true"
          />
        ))}
      </section>
    </>
  );
};

ExtendedImageView.propTypes = {
  current: PropTypes.number.isRequired,
  setCurrent: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  thumbnail: PropTypes.number.isRequired,
  setThumbnail: PropTypes.func.isRequired,
  selectedImg: PropTypes.string.isRequired,
  setSelectedImg: PropTypes.func.isRequired,
};

export default ExtendedImageView;
