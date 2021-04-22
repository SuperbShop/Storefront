import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const GalleryWrapper = styled.div`
  padding-right: 1.5rem;
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 80vh;
  cursor: -moz-zoom-in;
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
  padding-right: 10px;
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

// class ImageGallery extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentImageIndex: 0,
//       currentImage: null,
//     };
//   }

//   render() {
//     const { selectedStyle } = this.props;
//     return (
//       <GalleryWrapper>
//         <Carousel fade>
//           {selectedStyle.photos && selectedStyle.photos.map((photo, index) => (
//             <Carousel.Item key={index}>
//               <Image src={photo.url || 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'} alt="product" />
//             </Carousel.Item>
//           ))}
//         </Carousel>
//         <Wrapper>
//           {selectedStyle.photos && selectedStyle.photos.map((photo, index) => (
//             <Thumbnail key={index} src={photo.thumbnail_url || 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'} alt="product" />
//           ))}
//         </Wrapper>
//       </GalleryWrapper>
//     );
//   }
// }

const ImageGallery = ({photos}) => {
  const [current, setCurrent] = useState(0);
  const length = photos.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(photos) || photos.length === 0) {
    return null;
  }

  return (
    <section className="slider">
      <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" onClick={prevSlide} />
      <FontAwesomeIcon icon={faArrowRight} className="right-arrow" onClick={nextSlide} />
      {photos.map((photo, index) => {
        return (
          <div className={index === current ? 'slide active' : 'slide'} key={index}>
            {index === current && (<Image src={photo.url} alt="product" />) }

          </div>)})}
    </section>
  );
};

export default ImageGallery;
