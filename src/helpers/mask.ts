import { findMajority as findMajorityInCandidates } from './find.majority';

type IMaskConfigValue = { clean: RegExp; match: RegExp };
type IMaskConfig = { [char: string]: IMaskConfigValue };

// não usar caracteres especiais de regex na 'key' e.g. '.' '*' '+' '?' '^' '$' '(' ')' '[' ']' '{' '}' '|' '\'
const maskConfig: IMaskConfig = {
  /* alphabet */ A: { clean: /[^A-Za-z]/g, match: /[A-Za-z]/g },
  /* numeric */ '0': { clean: /[^0-9]/g, match: /[0-9]/g },
  /* alphanumeric */ '#': { clean: /[^A-Za-z0-9]/g, match: /[A-Za-z0-9]/g },
};

function findMajority(array: string[]) {
  return findMajorityInCandidates(array, Object.keys(maskConfig));
}

function findSuitableMask(masks: string, input: string) {
  const suitable = (mask: string, index: number, array: string[]) => {
    const { value: symbolChar } = findMajority([...mask]);

    if (!maskConfig[symbolChar]) return false;

    const maskLength = mask.match(new RegExp(`[${symbolChar}]`, 'g'))?.length;
    const inputLength = input.match(maskConfig[symbolChar].match)?.length;

    const inputIsGreaterThanMask = (inputLength ?? 0) > (maskLength ?? 0);
    const isLastMask = index === array.length - 1;

    return !inputIsGreaterThanMask || isLastMask;
  };

  return masks.split(',').find(suitable)?.trim();
}

function setMask(masks: string, input: string) {
  const mask = findSuitableMask(masks, input);
  if (!mask) return input;

  const majority = findMajority([...mask]);
  const chars = [...input.replace(maskConfig[majority.value].clean, '')];

  return [...mask].reduce((result, symbol) => {
    const inputValue = majority.value === symbol ? chars.shift() : '';
    const maskValue = chars.length ? symbol : '';

    return result.concat(inputValue || maskValue);
  }, '');
}

function clearMask(masks: string, input: string) {
  const mask = findSuitableMask(masks, input);
  if (!mask) return input;

  const majority = findMajority([...mask]);
  const symbols = [...mask.replace(maskConfig[majority.value].match, '')];

  return [...input].reduce((result, char) => {
    if (result.length >= majority.qty) return result.slice(0, majority.qty);
    return symbols.includes(char) ? result : result.concat(char);
  }, '');
}

export const set = setMask;
export const clear = clearMask;
