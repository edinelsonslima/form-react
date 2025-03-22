import { memo } from 'react';

import { Input } from '../Base';
import { IProps } from './types';

import s from './index.module.css';

function InputRadio(props: IProps) {
  return (
    <Input
      {...props}
      suffix={undefined}
      prefix={undefined}
      className={`${s.radio} ${props.className}`}
      // props={{
      //   container: { className: cn(s, 'container', rest.props?.container?.className) },
      //   label: {
      //     container: {
      //       className: cn(s, 'container-label', rest.props?.label?.container?.className),
      //     },
      //     label: {
      //       className: cn(s, 'label', rest.props?.label?.container?.className),
      //     },
      //   },
      //   input: {
      //     container: { className: cn(s, 'container-input', rest.props?.container?.className) },
      //   },
      // }}
    />
  );
}

export const Radio = memo(InputRadio);
export type { IProps };
