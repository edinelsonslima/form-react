import { memo } from 'react';

import { Select } from '../Select';
import { IProps } from './types';
import { useController } from './use.controller';

function InputEmail(props: IProps) {
  const { providersOptions, customFilter, ...rest } = useController(props);

  return (
    <Select
      {...rest}
      suffix={undefined}
      filterOptionsOnOpen
      openBy="options-length"
      onCustomFilter={customFilter}
      options={providersOptions}
      style={{ color: 'var(--rb-color-gray-600)' }}
    />
  );
}

export const Email = memo(InputEmail);
export type { IProps };
