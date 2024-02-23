const { config } = require('./config');

describe('Configuration file', () => {
  it('should have all required parameters with numeric values and currency "EUR"', () => {
    expect(config).toHaveProperty('cashIn');
    expect(config).toHaveProperty('cashOutNatural');
    expect(config).toHaveProperty('cashOutJuridical');

    expect(typeof config.cashIn.percents).toBe('number');
    expect(typeof config.cashIn.max.amount).toBe('number');
    expect(typeof config.cashOutNatural.percents).toBe('number');
    expect(typeof config.cashOutNatural.week_limit.amount).toBe('number');
    expect(typeof config.cashOutJuridical.percents).toBe('number');
    expect(typeof config.cashOutJuridical.min.amount).toBe('number');

    expect(config.cashIn.max.currency).toBe('EUR');
    expect(config.cashOutNatural.week_limit.currency).toBe('EUR');
    expect(config.cashOutJuridical.min.currency).toBe('EUR');
  });
});
