import { ComponentProps } from 'react';

import s from './index.module.css';
import { cn } from '@/libs/form/helpers/combine';

type IProps = ComponentProps<'span'> & {
  transparent?: boolean;
};

export function Separate({ transparent, className, ...props }: IProps) {
  return <span data-transparent={!!transparent} className={cn(s.separate, className)} {...props} />;
}
