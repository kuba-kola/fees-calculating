const { config } = require('../../config');
const { readInputFromFile } = require('../fileUtils');
const {
  roundToInteger,
  calculateCashInCommission,
  calculateCashOutJuridicalCommission,
  calculateCommissions,
  calculateResult,
} = require('.');

const filePath = './input.json';

const inputData = readInputFromFile(filePath);
const roundInteger = () => roundToInteger(0, 379);
const commision = () => calculateCommissions(100, 3);
const cashInCommission = () => calculateCashInCommission(200, 0.03, 5);
const cashOutJuridicalCommission = () => calculateCashOutJuridicalCommission(200, 0.03, 5);
const finalResult = () => calculateResult(inputData, config);

describe('Number rounding', () => {
  it('returns a rounded number to two digits after the period in string format', () => {
    expect(roundInteger()).toEqual('0.00');
  });
});

describe('Commision calculating', () => {
  it('returns the commission depending on the specified percentage', () => {
    expect(commision()).toEqual(3);
  });
});

describe('Calculating cash in commision', () => {
  it('returns calculated fee for transactions with type "cash-in"', () => {
    expect(cashInCommission()).toEqual(0.06);
  });
});

describe('Calculating cash out commision for juridical user_type', () => {
  it('returns calculated fee for transactions with type "cash-out"', () => {
    expect(cashOutJuridicalCommission()).toEqual(5);
  });
});

describe('Calculation of commissions for all transactions', () => {
  it('returns an array of numbers equal to the calculated commision', () => {
    expect(finalResult())
      .toEqual(
        expect.arrayContaining(Array(finalResult().length).fill(expect.any(Number))),
      );
  });
});
