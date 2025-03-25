import { ComponentProps } from 'react';
import { withShouldRender } from '@/helpers/should.render';
import { cn } from '@/helpers/combine';

import s from './index.module.css';

function AdornmentComponent({ className, ...props }: ComponentProps<'span'>) {
  return <span {...props} className={cn(className, s.adornment)} />;
}

export const Adornment = withShouldRender(AdornmentComponent);
