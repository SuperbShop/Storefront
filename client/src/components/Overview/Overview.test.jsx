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

test('should render the Overview component', () => {
  const productId = 23149;
  render(<Overview productId={productId} />);
  const overviewComponent = screen.getByTestId('overviewComponent');
  expect(overviewComponent).toBeInTheDocument();
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

test('should render the QuantitySelector component', () => {
  render(<QuantitySelector />);
  const quantitySelector = screen.getByTestId('quantitySelector');
  expect(quantitySelector).toBeInTheDocument();
});

test('should render the SizeSelector component', () => {
  const title = 'SELECT SIZE';
  const skus = {
    751683: { quantity: 14, size: '7' },
  };
  const resetThenSet = () => {};

  render(<SizeSelector title={title} skus={skus} resetThenSet={resetThenSet} />);
  const sizeSelector = screen.getByTestId('sizeSelector');
  expect(sizeSelector).toBeInTheDocument();
});

test('should render the StarRating component', () => {
  const ratings = [
    { rating: 4 }, { rating: 3 }, { rating: 5 },
  ];
  render(<StarRating ratings={ratings} />);
  const starRating = screen.getByTestId('starRating');
  expect(starRating).toBeInTheDocument();
});

test('should render the StyleSelector component', () => {
  const selectedStyle = {
    name: 'White & White',
    original_price: '99.00',
    sale_price: null,
    style_id: 129668,
  };
  const styles = [
    {
      name: 'White & Black',
      original_price: '99.00',
      sale_price: null,
      style_id: 129670,
      photos: [
        {
          thumbnail_url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        }],
    },
    {
      name: 'White & Red',
      original_price: '99.00',
      sale_price: null,
      style_id: 129669,
      photos: [
        {
          thumbnail_url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        }],
    },
  ];
  render(<StyleSelector selectedStyle={selectedStyle} styles={styles} />);
  const styleSelector = screen.getByTestId('styleSelector');
  expect(styleSelector).toBeInTheDocument();
});