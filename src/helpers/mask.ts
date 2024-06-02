import findMajority from './find.majority';

type IMaskConfigValue = { clean: RegExp; match: RegExp };
type IMaskConfig = { [char: string]: IMaskConfigValue };

// não usar caracteres especiais de regex na 'key' e.g. '.' '*' '+' '?' '^' '$' '(' ')' '[' ']' '{' '}' '|' '\'
const maskConfig: IMaskConfig = {
  /* alphabet */ A: { clean: /[^A-Za-z]/g, match: /[A-Za-z]/g },
  /* numeric */ '0': { clean: /[^0-9]/g, match: /[0-9]/g },
  /* alphanumeric */ '#': { clean: /[^A-Za-z0-9]/g, match: /[A-Za-z0-9]/g },
};

const splitMasks = (masks: string) => masks.split(',');

function setMask(mask: string[], input: string, symbolChar: string) {
  const chars = [...input.replace(maskConfig[symbolChar].clean, '')];

  return mask.reduce((result, symbol) => {
    const inputValue = symbolChar === symbol ? chars.shift() : '';
    const maskValue = chars.length ? symbol : '';

    return result.concat(inputValue || maskValue);
  }, '');
}

function handleSetMasks(masks: string, input: string) {
  const suitableMask = splitMasks(masks).find((mask, index, array) => {
    const { value: symbolChar } = findMajority([...mask]);

    if (!maskConfig[symbolChar]) return false;

    const maskLength = mask.match(new RegExp(`[${symbolChar}]`, 'g'))?.length;
    const inputLength = input.match(maskConfig[symbolChar].match)?.length;

    const inputIsGreaterThanMask = (inputLength ?? 0) > (maskLength ?? 0);
    const isLastMask = index === array.length - 1;

    return !inputIsGreaterThanMask || isLastMask;
  });

  if (!suitableMask) return input;

  const majority = findMajority([...suitableMask]);
  return setMask([...suitableMask.trim()], input, majority.value);
}

function clearMask(mask: string[], input: string, symbolChar: string) {
  const maskWithoutSymbolChar = mask.filter((char) => char !== symbolChar);

  return [...input].reduce((result, char) => {
    const isMaskChar = maskWithoutSymbolChar.includes(char);
    return isMaskChar ? result : result.concat(char);
  }, '');
}

function handleClearMasks(masks: string, value: string) {
  return splitMasks(masks).reduce((result, mask) => {
    const { value: symbolChar } = findMajority([...mask]);

    if (!mask.includes(symbolChar)) return result;
    return clearMask([...mask.trim()], result, symbolChar);
  }, value);
}

export default {
  set: handleSetMasks,
  clear: handleClearMasks,
};
