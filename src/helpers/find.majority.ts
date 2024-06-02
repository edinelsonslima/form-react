type IMajority = {
  qty: number;
  value: string;
  values: { [key: string]: number };
};

function findMajority(array: string[]) {
  const fn = (acc: IMajority, char: string) => {
    acc.values[char] ? acc.values[char]++ : (acc.values[char] = 1);

    const currentMaxQty = Math.max(...Object.values(acc.values));

    if (currentMaxQty > acc.qty) {
      acc.qty = currentMaxQty;
      acc.value = char;
    }

    return acc;
  };

  return array.reduce(fn, { qty: 0, value: '', values: {} });
}

export default findMajority;
