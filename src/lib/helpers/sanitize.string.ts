import { memoize } from './memoize';

export const sanitize = memoize((string: string) => {
  return string
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
});
