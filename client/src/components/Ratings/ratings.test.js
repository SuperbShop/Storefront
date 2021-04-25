var subtract = function(a, b) {
  return a - b;
};

test('subtracts 5 from 10', () => {
  expect(subtract(10, 5)).toBe(5);
});