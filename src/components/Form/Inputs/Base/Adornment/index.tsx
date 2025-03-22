import { ComponentProps } from 'react';
import { withShouldRender } from '@/helpers/should.render';

import s from './index.module.css';

function AdornmentComponent({ className, ...props }: ComponentProps<'span'>) {
  return <span className={`${s.adornment} ${className}`} {...props} />;
}

export const Adornment = withShouldRender(AdornmentComponent);
