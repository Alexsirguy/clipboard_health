import Helper, { Tdata } from './helper';

describe('Test simple statistic helper function', () => {
  let MOCK_DATA: Tdata[];

  beforeEach(() => {
    MOCK_DATA = [
      {
        name: 'Abhishek',
        salary: 145000,
        currency: 'USD',
        department: 'Engineering',
        sub_department: 'Platform',
      },
      {
        name: 'Anurag',
        salary: 90000,
        currency: 'USD',
        department: 'Banking',
        on_contract: true,
        sub_department: 'Loan',
      },
      {
        name: 'Himani',
        salary: 240000,
        currency: 'USD',
        department: 'Engineering',
        sub_department: 'Platform',
      },
    ];
  });

  test('Helper should return a matching object', () => {
    const result = Helper.getSS(MOCK_DATA);
    expect(result).toMatchObject({ min: 90000, max: 240000, mean: 158333.33333333334 });
  });

  test('Helper should return a key-value result object', () => {
    const result = Helper.getSS(MOCK_DATA);
    expect(result.min).toEqual(90000);
    expect(result.max).toEqual(240000);
    expect(result.mean).toEqual(158333.33333333334);
    expect(result.mean).not.toEqual(parseInt('158333.33333333334', 10));
  });

  test('Helper should return an empty result object', () => {
    const result = Helper.getSS([]);
    expect(result).toMatchObject({ });
  });

  test('Helper should return a result object for one element', () => {
    const result = Helper.getSS([{
      name: 'Himani',
      salary: 240000,
      currency: 'USD',
      department: 'Engineering',
      sub_department: 'Platform',
    }]);
    expect(result).toMatchObject({ min: 240000, max: 240000, mean: 240000 });
  });
});
