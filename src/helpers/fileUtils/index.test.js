const { readInputFromFile } = require('.');

const filePath = './input.json';

const data = readInputFromFile(filePath);

describe('Read input data from file', () => {
  it('returns array of objects with transaction data', () => {
    data.forEach((transaction) => {
      expect(transaction.date).toEqual(expect.any(String));
      expect(transaction.user_id).toEqual(expect.any(Number));
      expect(transaction.user_type).toMatch(/^(natural|juridical)$/);
      expect(transaction.type).toMatch(/^(cash_in|cash_out)$/);
      expect(transaction.operation.amount).toEqual(expect.any(Number));
      expect(transaction.operation.currency).toEqual('EUR');
    });
  });
});
