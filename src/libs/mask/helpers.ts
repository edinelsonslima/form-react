import { FormEvent, FormEventHandler } from 'react';
import { clearMask, setMask } from './logic';
import { HTMLInput, Mask, masks, Target } from '.';

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

function updateUnmasked(value: string, target: Target) {
  if (target?.current) {
    target.current!['rb-value'] = value;
    return;
  }

  // Delay to avoid waiting for ref to be initialized
  const animationFrameId = requestAnimationFrame(() => {
    if (target?.current) {
      target.current!['rb-value'] = value;
    }

    cancelAnimationFrame(animationFrameId);
  });
}

export function handleInput<T extends FormEvent<HTMLInput>>(
  mask: Mask,
  target: Target,
  onInput?: FormEventHandler<HTMLInputElement>,
) {
  return (evt: T) => {
    let unmasked = evt.currentTarget.value;

    if (typeof mask === 'object') {
      unmasked = mask.clear(evt.currentTarget.value);
      evt.currentTarget.value = mask.set(unmasked);
    }

    if (typeof mask === 'string') {
      unmasked = clearMask(mask, evt.currentTarget.value);
      evt.currentTarget.value = setMask(mask, unmasked);
    }

    updateUnmasked(unmasked, target);
    onInput?.(evt);
    return evt;
  };
}

export function handleValue(mask: Mask, value: string, target: Target) {
  if (typeof mask === 'object') {
    const masked = mask.set(value);
    updateUnmasked(mask.clear(masked), target);
    return masked;
  }

  if (typeof mask === 'string') {
    const masked = setMask(mask, value);
    updateUnmasked(clearMask(mask, masked), target);
    return masked;
  }

  updateUnmasked(value, target);
  return value;
}

export function getMask(mask?: Mask | ((mask: typeof masks) => Mask)) {
  return typeof mask === 'function' ? mask(masks) : (mask ?? '');
}
