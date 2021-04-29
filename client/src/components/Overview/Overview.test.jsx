import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import '../../matchMedia';
import Overview from './Overview';
import AddToCart from './Subcomponents/AddToCart';
import Description from './Subcomponents/Description';
import ImageGallery from './Subcomponents/ImageGallery';
import Price from './Subcomponents/Price';
import ProductInfo from './Subcomponents/ProductInfo';
import QuantitySelector from './Subcomponents/QuantitySelector';
import SizeSelector from './Subcomponents/SizeSelector';
import StarRating from './Subcomponents/StarRating';
import StyleSelector from './Subcomponents/StyleSelector';

afterEach(() => {
  cleanup();
});

test('should render the AddToCart component', () => {
  const productName = 'Heir Force Ones';
  const skus = {
    751683: { quantity: 14, size: '7' },
    751684: { quantity: 25, size: '7.5' },
  };
  render(<AddToCart skus={skus} productName={productName} />);
  const addToCart = screen.getByTestId('addToCart');
  expect(addToCart).toBeInTheDocument();
});

test('should render the Description component', () => {
  const product = {
    id: 23145,
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  };

  render(<Description currentProduct={product} />);
  const descriptionComponent = screen.getByTestId('description');
  expect(descriptionComponent).toBeInTheDocument();
});

test('should render the ImageGallery component', () => {
  const photos = [
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    },
    { thumbnail_url: 'https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80' },
  ];

  render(<ImageGallery photos={photos} />);
  const imageGallery = screen.getByTestId('gallery');
  expect(imageGallery).toBeInTheDocument();
});

test('should render the Price component', () => {
  const original = '99.00';
  const sale = '69.00';

  render(<Price sale={sale} price={original} />);
  const priceComponent = screen.getByTestId('priceComponent');
  expect(priceComponent).toBeInTheDocument();
});

test('should render the ProductInfo component', () => {
  const product = {
    id: 23145,
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  };

  render(<ProductInfo currentProduct={product} />);
  const productInfo = screen.getByTestId('productInfo');
  expect(productInfo).toBeInTheDocument();
});

// test('should render the Breakdown component', () => {
//   const productId = 23185;
//   const filterFunc = () => 'yo';
//   const reviewsMeta = {
//     productId: '23185',
//     recommended: {
//       false: '7',
//       true: '19',
//     },
//     ratings: {
//       1: '7',
//       2: '1',
//       3: '0',
//       4: '9',
//       5: '10',
//     },
//     characteristics: {
//       Quality: {
//         id: 77812,
//         value: '2.7',
//       },
//     },
//   };
//   render(<Breakdown productId={productId} reviewsMeta={reviewsMeta} filterFunc={filterFunc} />);
//   const breakdownComponent = screen.getByTestId('breakdown-1');
//   expect(breakdownComponent).toBeInTheDocument();
// });

// test('should render the Distribution component', () => {
//   const ratings = {
//     1: '7',
//     2: '6',
//     3: '5',
//     4: '4',
//     5: '3',
//   };
//   const filterFunc = () => 'foo';
//   render(<Distribution ratings={ratings} filterFunc={filterFunc} />);
//   const distributionComponent = screen.getByTestId('distribution-1');
//   expect(distributionComponent).toBeInTheDocument();
// });

// test('should render the ProductFactors component', () => {
//   const chars = {
//     Quality: {
//       id: 55555,
//       value: '2.00',
//     },
//   };
//   const productId = 23000;
//   render(<ProductFactors productId={productId} chars={chars} />);
//   const productFactorsComponent = screen.getByTestId('productfactors-1');
//   expect(productFactorsComponent).toBeInTheDocument();
// });
