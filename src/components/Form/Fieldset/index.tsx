import cn from '@/helpers/cn';
import { ComponentProps, PropsWithChildren, ReactNode, memo } from 'react';

import s from './index.module.css';

type IProps = ComponentProps<'fieldset'> & {
  name: string;
  legend?: ReactNode;
  layout?: 'column' | 'row';
};

function Component({ children, legend, layout = 'column', ...props }: PropsWithChildren<IProps>) {
  return (
    <fieldset className={cn(s, 'fieldset')} {...props} data-layout={layout}>
      {legend && <legend className={cn(s, 'legend')}>{legend}</legend>}
      {children}
    </fieldset>
  );
}

const Fieldset = memo(Component);
export default Fieldset;
