import cn from '@/helpers/cn';
import { ComponentProps, PropsWithChildren, memo } from 'react';

import s from './index.module.css';

type IProps = ComponentProps<'fieldset'> & {
  name: string;
};

function Component({ children, ...props }: PropsWithChildren<IProps>) {
  return (
    <fieldset className={cn(s, 'fieldset')} {...props}>
      {children}
    </fieldset>
  );
}

const Fieldset = memo(Component);
export default Fieldset;
