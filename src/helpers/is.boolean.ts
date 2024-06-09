function isTruthy(value: number | string | boolean | null | undefined) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return !!value;

  if (typeof value === 'string') {
    const truthy = ['true', '1', 'yes', 'on', 'enabled', 'active', 'ok', 'success'];
    return truthy.includes(value.toLowerCase());
  }

  return !!value;
}

export default isTruthy;
