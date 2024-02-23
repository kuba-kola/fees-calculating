const { feesCalculating } = require('.');
const filePath = 'input.json';

describe('Console output of calculation results', () => {
  it('returns each commission in order by retrieving it from the array', () => {
    expect(feesCalculating(filePath))
      .toEqual(
        expect.arrayContaining(Array(feesCalculating(filePath).length).fill(expect.any(Number)))
      );
  });
});
