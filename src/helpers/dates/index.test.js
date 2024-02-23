const { getWeek } = require(".");

const data = getWeek("2016-02-15");

describe('Expected number of the week', () => {
    it('returns week number', () => {
        expect(data).toEqual(7);
    })
});