import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
// import renderer from 'react-test-renderer';
import Ratings from '../Ratings';
import Breakdown from '../children/Breakdown';
import ReviewsList from '../children/ReviewsList';
import Distribution from '../children/grandchildren/Distribution';
import ProductFactors from '../children/grandchildren/ProductFactors';

afterEach(() => {
  cleanup();
});

test('should render the ReviewsList component', () => {
  const productName = 'testproduct';
  const filterState = [];
  const reviewsList = {
    product: '22222',
    page: 0,
    count: 5,
    results: [
      { rating: '5', body: 'foo', photos: [] },
      { rating: '5', body: 'foo', photos: [] },
      { rating: '5', body: 'foo', photos: [] },
      { rating: '5', body: 'foo', photos: [] },
      { rating: '5', body: 'foo', photos: [] },
    ],
  };
  const reviewsMeta = {
    product_id: '00000',
    ratings: {
      1: '0',
      2: '5',
      3: '4',
      4: '4',
      5: '4',
    },
    recommended: {
      true: '1',
    },
    characteristics: {
      Quality: {
        id: 1,
        value: '5',
      },
    },
  };
  render(
    <ReviewsList
      productName={productName}
      filterState={filterState}
      reviewsList={reviewsList}
      reviewsMeta={reviewsMeta}
    />
  );
  const reviewsListComponent = screen.getByTestId('reviewslist-1');
  expect(reviewsListComponent).toBeInTheDocument();
});

test('should render the Breakdown component', () => {
  const productId = 23185;
  const filterFunc = () => 'yo';
  const reviewsMeta = {
    productId: '23185',
    recommended: {
      false: '7',
      true: '19',
    },
    ratings: {
      1: '7',
      2: '1',
      3: '0',
      4: '9',
      5: '10',
    },
    characteristics: {
      Quality: {
        id: 77812,
        value: '2.7',
      },
    },
  };
  render(<Breakdown productId={productId} reviewsMeta={reviewsMeta} filterFunc={filterFunc} />);
  const breakdownComponent = screen.getByTestId('breakdown-1');
  expect(breakdownComponent).toBeInTheDocument();
});

test('should render the Distribution component', () => {
  const ratings = {
    1: '7',
    2: '6',
    3: '5',
    4: '4',
    5: '3',
  };
  const filterFunc = () => 'foo';
  render(<Distribution ratings={ratings} filterFunc={filterFunc} />);
  const distributionComponent = screen.getByTestId('distribution-1');
  expect(distributionComponent).toBeInTheDocument();
});

test('should render the ProductFactors component', () => {
  const chars = {
    Quality: {
      id: 55555,
      value: '2.00',
    },
  };
  const productId = 23000;
  render(<ProductFactors productId={productId} chars={chars} />);
  const productFactorsComponent = screen.getByTestId('productfactors-1');
  expect(productFactorsComponent).toBeInTheDocument();
});