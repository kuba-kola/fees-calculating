const { getWeek } = require("./dates");

const roundToInteger = (value) => (Math.ceil(value * 100) / 100).toFixed(2);

const calculateCommissions = (amount, rate) => {
    return Math.ceil(amount * rate) / 100;
}

const calculateCashInCommission = (amount, rate, maxCommission) => {
    const commission = calculateCommissions(amount, rate);
    return commission > maxCommission ? maxCommission : commission;
};

const calculateCashOutJuridicalCommission = (amount, rate, minCommission) => {
    const commission = calculateCommissions(amount, rate);
    return commission < minCommission ? minCommission : commission;
};

const calculateResult = (transactions, config) => {
    const { cashIn, cashOutNatural, cashOutJuridical } = config;
    const userWeeklyAmounts = {};
    let commissionAmounts = [];

    transactions.forEach(transaction => {
        const { type, operation: { amount }, user_type } = transaction;
        const isCashIn = type === "cash_in";
        const isCashOutJuridical = type === "cash_out" && user_type === "juridical";
        const isCashOutNatural = type === "cash_out" && user_type === "natural";

        if (isCashIn) {
            const commission = calculateCashInCommission(
                amount,
                cashIn.percents,
                cashIn.max.amount
            );

            commissionAmounts.push(commission);
        } else if (isCashOutJuridical) {
            const commission = calculateCashOutJuridicalCommission(
                amount,
                cashOutJuridical.percents,
                cashOutJuridical.min.amount,
            );

            commissionAmounts.push(commission);
        } else if (isCashOutNatural) {
            const userId = transaction.user_id;
            const transactionWeek = getWeek(transaction.date);

            if (!userWeeklyAmounts[userId]) {
                userWeeklyAmounts[userId] = {};
            };

            if (!userWeeklyAmounts[userId][transactionWeek]) {
                userWeeklyAmounts[userId][transactionWeek] = 0;
            };

            const weeklyAmount = userWeeklyAmounts[userId][transactionWeek];

            if (weeklyAmount + transaction.operation.amount > cashOutNatural.week_limit.amount) {
                if (userWeeklyAmounts[userId].exceededLimit) {
                    const commission = calculateCommissions(transaction.operation.amount, cashOutNatural.percents);
                    commissionAmounts.push(commission);
                } else {
                    const exceededAmount = weeklyAmount + transaction.operation.amount - cashOutNatural.week_limit.amount;
                    const commission = calculateCommissions(exceededAmount, cashOutNatural.percents);
                    commissionAmounts.push(commission);
                    userWeeklyAmounts[userId].exceededLimit = true;
                }
            } else {
                commissionAmounts.push(0);
            }

            userWeeklyAmounts[userId][transactionWeek] += transaction.operation.amount;
        }
    });

    return commissionAmounts;
};


module.exports = {
    roundToInteger,
    calculateCashInCommission,
    calculateCashOutJuridicalCommission,
    calculateCommissions,
    calculateResult,
};
