import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

var subtract = function(a, b) {
  return a - b;
};

test('subtracts b from a', () => {
  expect(subtract(10, 5)).toBe(5);
});
