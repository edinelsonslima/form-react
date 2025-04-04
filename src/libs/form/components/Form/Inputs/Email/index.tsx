import { memo } from 'react';

import { Select } from '../Select';
import { IProps } from './types';
import { useController } from './use.controller';

import s from './index.module.css';
import { cn } from '@/libs/form/helpers/combine';

function InputEmail(props: IProps) {
  const { providersOptions, customFilter, ...rest } = useController(props);

  return (
    <Select
      {...rest}
      suffix={undefined}
      filterOptionsOnOpen
      openByOptionsLength
      className={cn(s.email, rest.className)}
      onCustomFilter={customFilter}
      options={providersOptions}
    />
  );
}

export const Email = memo(InputEmail);
export type { IProps };
