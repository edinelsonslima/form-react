import { ComponentProps } from 'react';
import { withShouldRender } from '@/libs/form/helpers/should.render';
import { cn } from '@/libs/form/helpers/combine';

import s from './index.module.css';

function AdornmentComponent({ className, ...props }: ComponentProps<'span'>) {
  return <span {...props} className={cn(className, s.adornment)} />;
}

export const Adornment = withShouldRender(AdornmentComponent);
