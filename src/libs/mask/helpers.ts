// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function memoize<T extends (...args: any[]) => any>(fn: T) {
  const cache = new Map();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    if (cache.has(key)) return cache.get(key);

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };
}

export const findMajority = memoize((array: string[], candidates: string[]) => {
  const fn = (
    acc: { qty: number; value: string; values: Record<string, number> },
    char: string,
  ) => {
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
