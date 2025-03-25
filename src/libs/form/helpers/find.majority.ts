import { memoize } from './memoize';

type IMajority = {
  qty: number;
  value: string;
  values: Record<string, number>;
};

export const findMajority = memoize((array: string[], candidates: string[]) => {
  const fn = (acc: IMajority, char: string) => {
    if (!candidates.includes(char)) return acc;

    acc.values[char] ? acc.values[char]++ : (acc.values[char] = 1);

    const currentMaxQty = Math.max(...Object.values(acc.values));

    if (currentMaxQty > acc.qty) {
      acc.qty = currentMaxQty;
      acc.value = char;
    }

    return acc;
  };

  return array.reduce(fn, { qty: 0, value: '', values: {} });
});
