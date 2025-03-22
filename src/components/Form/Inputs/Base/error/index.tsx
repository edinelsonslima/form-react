import { ComponentProps } from 'react';
import { withShouldRender } from '@/helpers/should.render';

import s from './index.module.css';

function ErrorComponent({ className, ...props }: ComponentProps<'small'>) {
  return <small className={`${s.error} ${className}`} {...props} />;
}

export const Error = withShouldRender(ErrorComponent);
