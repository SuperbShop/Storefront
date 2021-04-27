/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faArrowRight, faExpand, faCircle, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../../SharedComponents/Modal';

const PageBlockerModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.6;
  background-color: rgba(128,128,128,0.5);
`;

const ImageModalDiv = styled.div`
  position: fixed;
  background-color: transparent;
  left: 0;
  right: 0;
  top: 10%;
  margin: 0 auto;
  width: 90%;
  height: 70%;
  text-align:center;
  z-index: 2;
`;

const FullsizeImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 80vh;
  box-shadow: 0 5px 10px 2px rgba(195,192,192,.5);
  border: 1px solid grey;
  cursor: pointer;
`;

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

  const handleImageZoom = () => {
    const element = document.getElementsByClassName('backdrop')[0];
    element.classList.toggle('zoomed-img');
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
  const settings = {
    slidesToShow: (photos.length < 7 ? photos.length : 7),
    slidesToScroll: (photos.length < 7 ? photos.length : 7),
    infinite: false,
  };

  return (
    <div className="gallery">
      { selectedImg ? (
        <div>
          <PageBlockerModalDiv>
            <Modal>
              <ImageModalDiv>
                <section>
                  {
        current === 0 ? <FontAwesomeIcon icon={faArrowLeft} className="left-arrow hidden" onClick={prevSlide} /> : <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" onClick={prevSlide} />
          }
                  {current === photos.length - 1 ? <FontAwesomeIcon icon={faArrowRight} className="right-arrow hidden" onClick={nextSlide} /> : <FontAwesomeIcon icon={faArrowRight} className="right-arrow" onClick={nextSlide} />}
                  {photos.map((photo, index) => (
                    <div className={index === current ? 'modal-slide active' : 'modal-slide'} key={photo.thumbnail_url} aria-hidden="true">
                      {index === current && (<FullsizeImage onClick={handleImageZoom} src={photo.url || 'https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-564x564.jpg'} alt="product" />) }
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
                      alt="product"
                      onClick={() => handleClick(index)}
                      aria-hidden="true"
                    />
                  ))}
                </section>
              </ImageModalDiv>
            </Modal>
          </PageBlockerModalDiv>
        </div>
      ) : (
        <div>
          {' '}
          <section className="slider">
            {
      current === 0 ? <FontAwesomeIcon icon={faArrowLeft} className="left-arrow hidden" onClick={prevSlide} /> : <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" onClick={prevSlide} />
        }
            {current === photos.length - 1 ? <FontAwesomeIcon icon={faArrowRight} className="right-arrow hidden" onClick={nextSlide} /> : <FontAwesomeIcon icon={faArrowRight} className="right-arrow" onClick={nextSlide} />}
            {photos.map((photo, index) => (
              <div className={index === current ? 'slide active' : 'slide'} key={photo.thumbnail_url} onClick={() => setSelectedImg(photo.url || 'https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-564x564.jpg')} aria-hidden="true">
                {' '}
                <FontAwesomeIcon icon={faExpand} className="expand" onClick={() => setSelectedImg(photo.url || 'https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-564x564.jpg')} />
                {index === current && (<img className="image" src={photo.url || 'https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-564x564.jpg'} alt="product" />) }
              </div>
            ))}
          </section>
          <section className="thumb-slider">
            <Slider {...settings}>
              {photos.map((photo, index) => (
                <div key={photo.thumbnail_url}>
                  <img
                    className={index === current ? 'thumbnail active' : 'thumbnail'}
                    key={photo.url}
                    src={photo.url || 'https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-564x564.jpg'}
                    alt="product"
                    onClick={() => handleClick(index)}
                    aria-hidden="true"
                  />
                </div>
              ))}

            </Slider>
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
