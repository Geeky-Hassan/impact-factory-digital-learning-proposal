import { describe, expect, it } from 'vitest';
import { annualScenario, bookingScenario } from '@/lib/calculations';

describe('illustrative annual sales', () => {
  it.each([
    [10, 50, 500, 25000], [20, 50, 1000, 50000], [30, 50, 1500, 75000],
    [10, 100, 500, 50000], [20, 100, 1000, 100000], [30, 100, 1500, 150000],
    [10, 200, 500, 100000], [20, 200, 1000, 200000], [30, 200, 1500, 300000],
  ])('%i%% at £%i matches the agreed scenario', (adoption, price, learners, sales) => {
    expect(annualScenario(5000, adoption, price)).toEqual({ learners, sales });
  });
  it('preserves fractional learner-equivalents without compounding rounding', () => {
    expect(annualScenario(57, 13, 82.5)).toEqual({ learners: 7.41, sales: 611.325 });
    expect(annualScenario(5000, 0, 100)).toEqual({ learners: 0, sales: 0 });
  });
  it('rejects invalid or unsupported inputs', () => {
    for (const args of [[NaN, 10, 50], [5000, Infinity, 50], [5000, 10, -1], [-1, 10, 50], [1.5, 10, 50], [1000001, 10, 50], [5000, 101, 50], [5000, 10, 10001]]) {
      expect(annualScenario(args[0], args[1], args[2])).toBeNull();
    }
  });
});

describe('booking illustration', () => {
  it('distinguishes the published comparison from the requested assumption', () => {
    expect(bookingScenario(3500, 8, 50)?.total).toBe(3900);
    const fifty = bookingScenario(3750, 8, 50)!;
    const hundred = bookingScenario(3750, 8, 100)!;
    expect(fifty.addition).toBe(400);
    expect(fifty.total).toBe(4150);
    expect(fifty.uplift.toFixed(1)).toBe('10.7');
    expect(hundred.addition).toBe(800);
    expect(hundred.total).toBe(4550);
    expect(hundred.uplift.toFixed(1)).toBe('21.3');
  });
  it('holds the base booking fixed for fewer participants', () => {
    expect(bookingScenario(3750, 3, 50)?.total).toBe(3900);
    expect(bookingScenario(3750, 9, 50)).toBeNull();
    expect(bookingScenario(0, 8, 50)).toBeNull();
  });
});
