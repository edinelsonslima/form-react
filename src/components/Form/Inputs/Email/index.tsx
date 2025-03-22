import { memo } from 'react';

import { Select } from '../Select';
import { IProps } from './types';
import { useController } from './use.controller';

import s from './index.module.css';

function InputEmail(props: IProps) {
  const { providersOptions, customFilter, ...rest } = useController(props);

  return (
    <Select
      {...rest}
      suffix={undefined}
      className={`${s.email} ${rest.className}`}
      filterOptionsOnOpen
      onCustomFilter={customFilter}
      options={providersOptions}
    />
  );
}

export const Email = memo(InputEmail);
export type { IProps };
