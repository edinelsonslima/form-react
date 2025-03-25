import { ComponentProps, ReactNode } from 'react';
import { withShouldRender } from '@/helpers/should.render';
import { cn } from '@/helpers/combine';

import s from './index.module.css';

type Props = ComponentProps<'label'> & {
  suffix?: ReactNode;
  container?: ComponentProps<'div'>;
};

function LabelComponent({ suffix, container, className, ...props }: Props) {
  if (!suffix) {
    return <label {...props} className={cn(className, s.label)} />;
  }

  return (
    <div {...container}>
      <label {...props} className={cn(className, s.label)} />
      {suffix && suffix}
    </div>
  );
}

export const Label = withShouldRender(LabelComponent);
