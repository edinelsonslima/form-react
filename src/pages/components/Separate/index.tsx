import { ComponentProps } from 'react';

import s from './index.module.css';

type IProps = ComponentProps<'span'> & {
  transparent?: boolean;
};

export function Separate({ transparent, className, ...props }: IProps) {
  return (
    <span data-transparent={!!transparent} className={`${s.separate} ${className}`} {...props} />
  );
}
