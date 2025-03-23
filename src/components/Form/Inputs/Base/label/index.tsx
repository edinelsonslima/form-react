import { ComponentProps, ReactNode } from 'react';
import { withShouldRender } from '@/helpers/should.render';

import s from './index.module.css';
import { mp } from '@/helpers/mp';

type Props = ComponentProps<'label'> & {
  suffix?: ReactNode;
  components: {
    container?: ComponentProps<'div'>;
    label?: ComponentProps<'label'>;
  };
};

function LabelComponent({ suffix, components, ...props }: Props) {
  if (!suffix) {
    return <label {...mp(props, components.label, s.label)} />;
  }

  return (
    <div {...mp(components.container, s.container)}>
      <label {...mp(props, components.label, s.label)} />
      {suffix && suffix}
    </div>
  );
}

export const Label = withShouldRender(LabelComponent);
