export const money = (value: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(value) ? 0 : 2 }).format(value);
export const number = (value: number) => new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(value);

export function annualScenario(base: number, adoption: number, price: number) {
  if (![base, adoption, price].every(Number.isFinite) || !Number.isInteger(base) || base < 0 || base > 1000000 || adoption < 0 || adoption > 100 || price < 0 || price > 10000) return null;
  const learners = base * adoption / 100;
  return { learners, sales: learners * price };
}

export function bookingScenario(base: number, participants: number, price: number) {
  if (![base, participants, price].every(Number.isFinite) || base <= 0 || !Number.isInteger(participants) || participants < 1 || participants > 8 || price < 0) return null;
  const addition = participants * price;
  return { addition, total: base + addition, uplift: addition / base * 100 };
}
