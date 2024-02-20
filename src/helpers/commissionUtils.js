const { getWeek } = require("./dates");

const roundToInteger = (value) => Math.ceil(value * 100) / 100;

const calculateCashInCommission = (amount, maxCommission) => {
    const commission = amount * 0.0003;
    return commission > maxCommission ? maxCommission : commission;
};

const calculateCashOutJuridicalCommission = (amount, minCommission) => {
    const commission = amount * 0.003;
    return commission < minCommission ? minCommission : commission;
};

const calculateCashOutNaturalCommission = (operation, weekLimit, weekOperations) => {
    const commissionRate = 0.003;

    const currentDate = new Date(operation.date);
    const currentWeek = getWeek(currentDate);

    const totalCashOutThisWeek = weekOperations
        .filter(op => op.user_id === operation.user_id && op.type === 'cash_out' && new Date(op.date).getWeek() === currentWeek)
        .reduce((acc, op) => acc + op.operation.amount, 0);

    const freeLimitExceeded = totalCashOutThisWeek > weekLimit;

    if (freeLimitExceeded) {
        return operation.amount * commissionRate;
    };

    return 0;
};


module.exports = {
    roundToInteger,
    calculateCashInCommission,
    calculateCashOutJuridicalCommission,
    calculateCashOutNaturalCommission,
};
