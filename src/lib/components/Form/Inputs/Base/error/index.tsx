import { ComponentProps } from 'react';
import { withShouldRender } from '@/lib/helpers/should.render';
import { cn } from '@/lib/helpers/combine';

import s from './index.module.css';

function ErrorComponent({ className, ...props }: ComponentProps<'small'>) {
  return <small {...props} className={cn(className, s.error)} />;
}

export const Error = withShouldRender(ErrorComponent);
