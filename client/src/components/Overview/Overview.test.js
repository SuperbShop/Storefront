/* eslint-disable no-undef */
// import dependencies
import React from 'react';

// import react-testing methods
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
// Resolve react-slick matchMedia error
import '../../matchMedia';
// the component to test
import Overview from './Overview';

test('adds 2 + 2 to equal 4', () => {
  expect(2 + 2).toBe(4);
});
