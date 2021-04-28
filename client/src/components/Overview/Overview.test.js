/* eslint-disable no-undef */
// import dependencies
import React from 'react';
// import react-testing methods
import {cleanup, fireEvent, render} from '@testing-library/react';
// Resolve react-slick matchMedia error
import '../../matchMedia';
// the component to test
import Overview from './Overview';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);
test('Overview render', () => {
  const component = renderer.create(
    <Overview />,
  );
});
