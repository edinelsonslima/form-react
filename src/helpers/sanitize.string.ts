import memoize from './memoize';

function sanitize(string: string) {
  return string
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default memoize(sanitize);
