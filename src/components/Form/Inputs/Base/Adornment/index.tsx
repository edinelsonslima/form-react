import { ComponentProps } from 'react';
import { withShouldRender } from '@/helpers/should.render';

import s from './index.module.css';
import { mp } from '@/helpers/mp';

function AdornmentComponent({ ...props }: ComponentProps<'span'>) {
  return <span {...mp(props, s.adornment)} />;
}

export const Adornment = withShouldRender(AdornmentComponent);
