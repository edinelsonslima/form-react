import { memo } from 'react';

import { Input } from '../Base';
import { IProps } from './types';
import { mp } from '@/helpers/mp';

import s from './index.module.css';

function InputCheckbox({ components, ...props }: IProps) {
  return (
    <Input
      {...mp(props, s.checkbox)}
      suffix={undefined}
      prefix={undefined}
      components={mp(components, {
        inputW: mp(components?.inputW, s.wrapper),
        label: mp(components?.label, s.label),
        inputC: mp(components?.inputC, s.content),
      })}
    />
  );
}

export const Checkbox = memo(InputCheckbox);
export type { IProps };
