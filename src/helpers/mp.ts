export function mp<T>(props?: T, ...toMerge: (string | undefined | Partial<T>)[]) {
  props = props || ({} as T);

  toMerge?.forEach((prop) => {
    if (!prop) return;

    if (typeof prop === 'string' && prop.trim() !== 'undefined') {
      // @ts-expect-error - I don't know how to fix this
      props['className'] = [prop, props['className']].join(' ').trim();
    }

    if (typeof prop !== 'object') return;

    Object.entries(prop).forEach(([key, value]) => {
      if (typeof value === 'string') {
        // @ts-expect-error - I don't know how to fix this
        props[key] = [value, props[key]].join(' ').trim();
      }

      if (typeof value === 'object') {
        // @ts-expect-error - I don't know how to fix this
        props[key] = { ...props[key], ...value };
      }

      if (typeof value === 'function') {
        // @ts-expect-error - I don't know how to fix this
        const fn = props[key];

        // @ts-expect-error - I don't know how to fix this
        props[key] = (...args: unknown[]) => {
          fn(...args);
          value(...args);
        };
      }
    });
  });

  return props;
}
