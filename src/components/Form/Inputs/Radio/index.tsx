import { memo } from 'react';

import { Input } from '../Base';
import { IProps } from './types';
import { cp, cn } from '@/helpers/combine';

import s from './index.module.css';

function InputRadio({ components, className, ...props }: IProps) {
  return (
    <Input
      {...props}
      className={cn(className, s.radio)}
      suffix={undefined}
      prefix={undefined}
      components={{
        ...components,
        wrapper: cp(components?.wrapper, s.wrapper),
        label: cp(components?.label, s.label),
        inputC: cp(components?.inputC, s['input-content']),
      }}
    />
  );
}

export const Radio = memo(InputRadio);
export type { IProps };
