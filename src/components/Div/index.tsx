import { CSSProperties } from '@/types/css.properties';
import { ComponentProps, PropsWithChildren } from 'react';

function Div({ children, ...rest }: PropsWithChildren<CSSProperties & ComponentProps<'div'>>) {
  const [props, styles] = Object.entries(rest).reduce<Record<string, string>[]>(
    ([p, s], [key, value]) =>
      !key.startsWith('__')
        ? [{ ...p, [key]: value }, s]
        : [p, { ...s, [key.replace(/^__/, '')]: value }],
    [],
  );

  return (
    <div style={styles} {...props}>
      {children}
    </div>
  );
}

export default Div;
