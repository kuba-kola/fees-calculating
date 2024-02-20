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
      switch (user_type) {
        case 'natural':
          return calculateCashOutNaturalCommission(amount, cashOutNatural.weekLimit, cashOutNatural.weekOperations);
        case 'juridical':
          return calculateCashOutJuridicalCommission(amount, cashOutJuridical.minCommission);
        default:
          return console.error('Unknown user type:', user_type);
      }
    default:
      return console.error('Unknown operation type:', type);
  }
}

const calculateResult = (inputData, config) => {
  const result = [];
  for (const operation of inputData) {
    const commission = calculateCommission(operation, config);
    const roundedCommission = roundToInteger(commission);
    result.push(roundedCommission.toFixed(2));
  }
  return result;
}


Date.prototype.getWeek = function () {
  const onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

const feesCalculating = (inputFilePath) => {
  const inputData = readInputFromFile(inputFilePath);
  const config = {
    cashIn: { maxCommission: 5 },
    cashOutNatural: { weekLimit: 1000, freeLimit: 1000, weekOperations: [] },
    cashOutJuridical: { minCommission: 0.5 }
  };
  const result = calculateResult(inputData, config);
  console.log("result", result)
  console.log("inputData", inputData)
  console.log("config", config)
  for (const commission of result) {
    console.log("commission", commission);
  }
}

module.exports = { feesCalculating };