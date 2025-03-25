import { memo } from 'react';

import { cn, cp } from '@/libs/form/helpers/combine';

import { Input } from '../Base';
import { IProps } from './types';

import s from './index.module.css';

function InputCheckbox({ components = {}, className = '', ...props }: IProps) {
  return (
    <Input
      {...props}
      suffix={undefined}
      prefix={undefined}
      className={cn(className, s.checkbox)}
      components={{
        ...components,
        wrapper: cp(components?.wrapper, s.wrapper),
        label: cp(components?.label, s.label),
        inputC: cp(components?.inputC, s.content),
      }}
    />
  );
}

export const Checkbox = memo(InputCheckbox);
export type { IProps };
