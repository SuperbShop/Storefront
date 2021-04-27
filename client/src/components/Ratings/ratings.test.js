var subtract = function(a, b) {
  return a - b;
};

test('subtracts b from a', () => {
  expect(subtract(10, 5)).toBe(5);
});
