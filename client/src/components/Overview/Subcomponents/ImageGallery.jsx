import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faArrowRight, faArrowUp, faArrowDown, faExpand, faCircle, faTimes
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
// import Modal from './Modal';

const ImageGallery = ({ photos }) => {
  const [current, setCurrent] = useState(0);
  const [thumbnail, setThumbnail] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);

  const nextSlide = () => {
    if (current !== photos.length - 1) {
      setCurrent(current + 1);
      setThumbnail(thumbnail + 1);
    }
  };

  const closeModal = () => {
    setSelectedImg(null);
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

  if (!Array.isArray(photos) || photos.length === 0) {
    return null;
  }

  return (
    <div className="gallery">
      { selectedImg ? (
        <div>
          <section className="backdrop">
            {
      current === 0 ? <FontAwesomeIcon icon={faArrowLeft} className="left-arrow hidden" onClick={prevSlide} /> : <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" onClick={prevSlide} />
        }
            {current === photos.length - 1 ? <FontAwesomeIcon icon={faArrowRight} className="right-arrow hidden" onClick={nextSlide} /> : <FontAwesomeIcon icon={faArrowRight} className="right-arrow" onClick={nextSlide} />}
            {photos.map((photo, index) => (
              <div className={index === current ? 'modal-slide active' : 'modal-slide'} key={photo.thumbnail_url} aria-hidden="true">
                {index === current && (<img className="backdrop" src={photo.url} alt="product" />) }
              </div>
            ))}
            <FontAwesomeIcon icon={faTimes} className="closeBtn" onClick={closeModal} />
          </section>
          <section className="modal-icons">
            {photos.map((photo, index) => (
              <FontAwesomeIcon icon={faCircle}
                className={index === current ? 'dots active' : 'dots'}
                key={photo.thumbnail_url}
                src={photo.thumbnail_url}
                alt="product"
                onClick={() => handleClick(index)}
                aria-hidden="true"
              />
            ))}
          </section>
        </div>
      ) : (
        <div>
          <section className="thumb-slider">
            {thumbnail === 0 ? <FontAwesomeIcon icon={faArrowUp} className="hidden" /> : <FontAwesomeIcon icon={faArrowUp} onWheel={prevSlide} onClick={prevSlide} />}

            {photos.map((photo, index) => (
              <img
                className={index === current ? 'thumbnail active' : 'thumbnail'}
                key={photo.thumbnail_url}
                src={photo.thumbnail_url}
                alt="product"
                onClick={() => handleClick(index)}
                aria-hidden="true"
              />
            ))}
            {thumbnail === photos.length - 1 ? <FontAwesomeIcon icon={faArrowDown} className="hidden" /> : <FontAwesomeIcon icon={faArrowDown} onWheel={nextSlide} onClick={nextSlide} />}
          </section>
          {' '}
          <section className="slider">
            {
      current === 0 ? <FontAwesomeIcon icon={faArrowLeft} className="left-arrow hidden" onClick={prevSlide} /> : <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" onClick={prevSlide} />
        }
            {current === photos.length - 1 ? <FontAwesomeIcon icon={faArrowRight} className="right-arrow hidden" onClick={nextSlide} /> : <FontAwesomeIcon icon={faArrowRight} className="right-arrow" onClick={nextSlide} />}
            {photos.map((photo, index) => (
              <div className={index === current ? 'slide active' : 'slide'} key={photo.thumbnail_url} onClick={() => setSelectedImg(photo.url)} aria-hidden="true">
                {' '}
                <FontAwesomeIcon icon={faExpand} className="expand" onClick={() => setSelectedImg(photo.url)} />
                {index === current && (<img className="image" src={photo.url} alt="product" />) }
              </div>
            ))}
          </section>
        </div>
      )}

    </div>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({})),
};

ImageGallery.defaultProps = {
  photos: [],
};

export default ImageGallery;
