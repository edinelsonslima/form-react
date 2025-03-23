import { ComponentProps } from 'react';
import { withShouldRender } from '@/helpers/should.render';

import s from './index.module.css';
import { mp } from '@/helpers/mp';

function ErrorComponent({ ...props }: ComponentProps<'small'>) {
  return <small {...mp(props, s.error)} />;
}

export const Error = withShouldRender(ErrorComponent);
