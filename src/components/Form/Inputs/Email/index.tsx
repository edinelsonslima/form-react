import { forwardRef, memo } from 'react';
import Select from '../Select';
import { IProps } from './types';

import useController from './use.controller';

const Component = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { providersOptions, customFilter, ...rest } = useController(props);

  return (
    <Select
      {...rest}
      ref={ref}
      suffix={undefined}
      filterOptionsOnOpen
      onCustomFilter={customFilter}
      options={providersOptions}
    />
  );
});

const InputEmail = memo(Component);
export default InputEmail;
