import cn from '@/helpers/cn';
import { ComponentProps, PropsWithChildren } from 'react';

import s from './index.module.css';

type IProps = ComponentProps<'fieldset'> & {
  name: string;
};

function Fieldset({ children, ...props }: PropsWithChildren<IProps>) {
  return (
    <fieldset className={cn(s, 'fieldset')} {...props}>
      {children}
    </fieldset>
  );
}

export default Fieldset;
