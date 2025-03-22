import { ComponentProps, PropsWithChildren, ReactNode, memo } from 'react';

import s from './index.module.css';

type IProps = ComponentProps<'fieldset'> & {
  name: string;
  legend?: ReactNode;
  layout?: 'column' | 'row';
};

function FieldsetComponent({ children, legend, layout, ...props }: PropsWithChildren<IProps>) {
  return (
    <fieldset className={s.fieldset} {...props} data-layout={layout ?? 'column'}>
      {legend && <legend className={s.legend}>{legend}</legend>}
      {children}
    </fieldset>
  );
}

export const Fieldset = memo(FieldsetComponent);
