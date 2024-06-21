import { forwardRef, memo } from 'react';

import cn from '@/helpers/cn';

import Select from '../Select';
import { IProps } from './types';
import useController from './use.controller';

import s from './index.module.css';

const Component = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { providersOptions, customFilter, ...rest } = useController(props);

  return (
    <Select
      {...rest}
      ref={ref}
      suffix={undefined}
      className={cn(s, 'email', rest.className)}
      filterOptionsOnOpen
      onCustomFilter={customFilter}
      options={providersOptions}
    />
  );
});

export type { IProps };

const InputEmail = memo(Component);
export default InputEmail;
