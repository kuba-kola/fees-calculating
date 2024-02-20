const {
  calculateCashInCommission,
  calculateCashOutNaturalCommission,
  calculateCashOutJuridicalCommission,
  roundToInteger,
} = require('./helpers/commissionUtils');
const { readInputFromFile } = require('./helpers/fileUtils');

const calculateCommission = (operation, config) => {
  const { type, operation: { amount }, user_type } = operation;
  const { cashIn, cashOutNatural, cashOutJuridical } = config;

  switch (type) {
    case 'cash_in':
      return calculateCashInCommission(amount, cashIn.maxCommission);
    case 'cash_out':
      return user_type === 'natural' ?
        calculateCashOutNaturalCommission(amount, cashOutNatural.weekLimit, cashOutNatural.weekOperations) :
        calculateCashOutJuridicalCommission(amount, cashOutJuridical.minCommission);
    default:
      console.error('Unknown operation type:', type);
      return null;
  };
};

const calculateResult = (inputData, config) => {
  return inputData.map(operation => {
    const commission = calculateCommission(operation, config);
    return roundToInteger(commission).toFixed(2);
  });
};

const feesCalculating = (inputFilePath) => {
  const inputData = readInputFromFile(inputFilePath);
  const config = {
    cashIn: { maxCommission: 5 },
    cashOutNatural: { weekLimit: 1000, freeLimit: 1000, weekOperations: [] },
    cashOutJuridical: { minCommission: 0.5 }
  };
  const result = calculateResult(inputData, config);
  result.forEach(commission => console.log("commission", commission));
};

module.exports = { feesCalculating };
