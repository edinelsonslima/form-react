import { CSSProperties } from 'react';

function kebabCaseToCamelCase(properties: CSSProperties) {
  return Object.entries(properties).reduce((acc, [key, value]) => {
    const camelCaseKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    return { ...acc, [camelCaseKey]: value };
  }, {});
}

export default kebabCaseToCamelCase;
