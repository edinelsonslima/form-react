import { memo } from 'react';

import { Input } from '../Base';
import { IProps } from './types';
import { mp } from '@/helpers/mp';

import s from './index.module.css';

function InputRadio({ components, ...props }: IProps) {
  return (
    <Input
      {...mp(props, s.radio)}
      suffix={undefined}
      prefix={undefined}
      components={mp(components, {
        inputW: mp(components?.inputW, s.wrapper),
        label: mp(components?.label, s.label),
        inputC: mp(components?.inputC, s['input-content']),
      })}
    />
  );
}

export const Radio = memo(InputRadio);
export type { IProps };
