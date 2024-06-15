import kebabCaseToCamelCase from '@/helpers/css.utilities';
import { CSSProperties } from '@/types/css.properties';
import { PropsWithChildren } from 'react';

function Div({ children, ...styles }: PropsWithChildren<CSSProperties>) {
  return <div style={kebabCaseToCamelCase(styles)}>{children}</div>;
}

export default Div;
