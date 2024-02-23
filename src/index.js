const { config } = require('./config');
const {
  calculateResult,
  roundToInteger,
} = require('./helpers/commissionUtils');
const { readInputFromFile } = require('./helpers/fileUtils');

const feesCalculating = (inputFilePath) => {
  const inputData = readInputFromFile(inputFilePath);
  const result = calculateResult(inputData, config);

  result.forEach((commission) => console.log(roundToInteger(commission)));

  return result;
};

module.exports = { feesCalculating };
