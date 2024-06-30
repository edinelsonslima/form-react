import { forwardRef, memo } from 'react';

import cn from '@/helpers/cn';

import Input from '../Base';
import { IProps } from './types';
import useController from './use.controller';

import s from './index.module.css';

const Component = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { ...rest } = useController(props);

  return (
    <Input
      {...rest}
      ref={ref}
      suffix={undefined}
      prefix={undefined}
      className={cn(s, 'radio', rest.className)}
      props={{
        container: { className: cn(s, 'container', rest.props?.container?.className) },
        label: {
          container: {
            className: cn(s, 'container-label', rest.props?.label?.container?.className),
          },
          label: {
            className: cn(s, 'label', rest.props?.label?.container?.className),
          },
        },
        input: {
          container: { className: cn(s, 'container-input', rest.props?.container?.className) },
        },
      }}
    />
  );
});

export type { IProps };

const InputRadio = memo(Component);
export default InputRadio;
