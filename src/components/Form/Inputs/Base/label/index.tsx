import { ComponentProps, ReactNode } from 'react';
import { withShouldRender } from '@/helpers/should.render';

import s from './index.module.css';

type Props = ComponentProps<'label'> & {
  suffix?: ReactNode;
};

function LabelComponent({ suffix, className, ...props }: Props) {
  if (!suffix) {
    return <label {...props} className={`${s.label} ${className}`} />;
  }

  return (
    <div className={s.container}>
      <label {...props} className={`${s.label} ${className}`} />
      {suffix && suffix}
    </div>
  );
}

export const Label = withShouldRender(LabelComponent);
